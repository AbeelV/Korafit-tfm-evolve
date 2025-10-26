"use client"

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/30 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-orange-600/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-orange-500/25 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10"></div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40"></div>
    </div>
  )
}
