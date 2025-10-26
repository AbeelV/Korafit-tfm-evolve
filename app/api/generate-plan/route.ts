import { type NextRequest, NextResponse } from "next/server"

const WEBHOOK_URL = "https://primary-production-f9d1.up.railway.app/webhook-test/67ac2bb9-c1e1-4db6-b4fe-030567a83161"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] Received form data:", body)

    const transformedPayload = {
      userId: body.userId,
      userEmail: body.email,
      userName: `${body.firstName} ${body.lastName}`,
      profile: {
        userId: body.userId,
        edad: Number.parseInt(body.age) || 25,
        sexo: body.gender || "No especificado",
        peso: Number.parseInt(body.weight),
        altura: Number.parseInt(body.height),
        telefono: body.phone,
        objetivo:
          body.mainGoal === "gain-muscle"
            ? "Ganar músculo"
            : body.mainGoal === "lose-fat"
              ? "Perder grasa"
              : "Mantenerse",
        experiencia:
          body.experienceLevel === "beginner"
            ? "Principiante"
            : body.experienceLevel === "intermediate"
              ? "Intermedio"
              : "Avanzado",
        nivelActividad:
          body.activityLevel === "sedentary" ? "Sedentario" : body.activityLevel === "active" ? "Activo" : "Deportista",
        diasEntreno: Number.parseInt(body.trainingDays),
        lesiones: body.injuries || "Ninguna",
        restricciones: body.dietaryRestrictions || "Ninguna",
      },
    }

    console.log("[v0] Sending to webhook:", WEBHOOK_URL)
    console.log("[v0] Payload:", JSON.stringify(transformedPayload, null, 2))

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedPayload),
      cache: "no-store",
    })

    console.log("[v0] Webhook response status:", response.status)

    const responseText = await response.text()
    console.log("[v0] Webhook raw response:", responseText.substring(0, 500) + "...")

    if (responseText.includes("FUNCTION_INVOCATION_TIMEOUT") || responseText.includes("An error occurred")) {
      console.error("[v0] Webhook timeout or deployment error:", responseText)
      throw new Error(
        "El webhook tardó demasiado en responder. La generación de planes puede tardar unos minutos. Por favor, intenta de nuevo en unos momentos.",
      )
    }

    if (!response.ok) {
      console.error("[v0] Webhook error response:", responseText)
      throw new Error(`Webhook failed with status ${response.status}: ${responseText}`)
    }

    if (!responseText || responseText.trim() === "") {
      console.log("[v0] Webhook returned empty response")
      throw new Error("El webhook no devolvió ningún dato")
    }

    const trimmedResponse = responseText.trim()
    if (!trimmedResponse.startsWith("{") && !trimmedResponse.startsWith("[")) {
      console.error("[v0] Response is not JSON:", trimmedResponse)
      throw new Error(
        "El webhook devolvió una respuesta inválida. Por favor, verifica que el webhook esté configurado correctamente.",
      )
    }

    let data
    try {
      data = JSON.parse(responseText)
      console.log("[v0] Webhook success, received data with keys:", Object.keys(data))

      let trainingPlan = null
      let nutritionPlan = null

      if (data.planEntrenamiento) {
        try {
          trainingPlan = JSON.parse(data.planEntrenamiento)
          console.log("[v0] Parsed training plan successfully")
        } catch (e) {
          console.error("[v0] Failed to parse training plan:", e)
        }
      }

      if (data.planNutricion) {
        try {
          nutritionPlan = JSON.parse(data.planNutricion)
          console.log("[v0] Parsed nutrition plan successfully")
        } catch (e) {
          console.error("[v0] Failed to parse nutrition plan:", e)
        }
      }

      return NextResponse.json({
        success: true,
        userId: data.userId,
        training: trainingPlan,
        nutrition: nutritionPlan,
      })
    } catch (parseError) {
      console.error("[v0] Failed to parse webhook response as JSON:", parseError)
      throw new Error("La respuesta del webhook no es válida")
    }
  } catch (error) {
    console.error("[v0] API Route Error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Error al procesar la solicitud",
        details:
          "No se pudo conectar con el servicio de generación de planes. Por favor, verifica que el webhook esté activo.",
      },
      { status: 500 },
    )
  }
}
