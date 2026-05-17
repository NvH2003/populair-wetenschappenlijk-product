import { Suspense, useRef, useEffect, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Local avatar in /public; swap daan.glb for a Ready Player Me export anytime
const AVATAR_URL = '/daan.glb'

useGLTF.preload(AVATAR_URL)

// ─── Model ───────────────────────────────────────────────────────────────────
function AvatarModel({ speaking }) {
  const { scene } = useGLTF(AVATAR_URL)
  const clock = useRef(0)
  const headBone = useRef(null)
  const jawBone = useRef(null)
  const morphMeshes = useRef([])

  useEffect(() => {
    const meshes = []
    scene.traverse(node => {
      if (node.isMesh && node.morphTargetDictionary) meshes.push(node)
      if (node.isBone) {
        const n = node.name.toLowerCase()
        if (n.includes('head') && !headBone.current) headBone.current = node
        if (n.includes('jaw') && !jawBone.current) jawBone.current = node
      }
    })
    morphMeshes.current = meshes
  }, [scene])

  useFrame((_, delta) => {
    clock.current += delta

    // ---- Morph-target talking (for RPM avatars with visemes) ----
    morphMeshes.current.forEach(mesh => {
      const dict = mesh.morphTargetDictionary
      const inf = mesh.morphTargetInfluences
      const jawIdx = dict?.jawOpen ?? dict?.mouthOpen ?? dict?.viseme_aa
      if (jawIdx !== undefined) {
        inf[jawIdx] = speaking
          ? THREE.MathUtils.lerp(inf[jawIdx],
              Math.max(0, Math.sin(clock.current * 9) * 0.55 +
                           Math.sin(clock.current * 5.3) * 0.2), 0.3)
          : THREE.MathUtils.lerp(inf[jawIdx], 0, 0.2)
      }
      const blinkIdx = dict?.eyesClosed ?? dict?.eyeBlinkLeft
      if (blinkIdx !== undefined) {
        const b = clock.current % 3.6
        inf[blinkIdx] = b > 3.45
          ? THREE.MathUtils.lerp(inf[blinkIdx], 1, 0.5)
          : THREE.MathUtils.lerp(inf[blinkIdx], 0, 0.4)
      }
    })

    // ---- Bone-based jaw (fallback for rigged models without morph targets) ----
    if (jawBone.current) {
      const target = speaking
        ? Math.max(0, Math.sin(clock.current * 8)) * 0.18
        : 0
      jawBone.current.rotation.x = THREE.MathUtils.lerp(
        jawBone.current.rotation.x, target, 0.3
      )
    }

    // ---- Subtle head bob when speaking ----
    if (headBone.current) {
      const bob = speaking ? Math.sin(clock.current * 4.5) * 0.015 : 0
      headBone.current.rotation.x = THREE.MathUtils.lerp(
        headBone.current.rotation.x, bob, 0.08
      )
    }
  })

  return (
    <primitive
      object={scene}
      position={[0, -1.3, 0]}
    />
  )
}

// ─── Error boundary ───────────────────────────────────────────────────────────
class AvatarBoundary extends Component {
  state = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  render() {
    if (this.state.error) return this.props.fallback
    return this.props.children
  }
}

// ─── Fallback shown while loading or on error ─────────────────────────────────
function AvatarFallback3D({ width, height, type }) {
  const colors = {
    verwacht: '#e5e7eb',
    werkelijk: '#fed7aa',
    huidig: '#334155',
    toekomst: '#bbf7d0',
  }
  const bg = colors[type] ?? colors.huidig
  return (
    <div
      style={{
        width,
        height,
        borderRadius: '50% 50% 40% 40%',
        background: `linear-gradient(160deg, ${bg} 0%, #0f172a 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: width * 0.38,
        fontWeight: 700,
        color: '#fff',
        flexShrink: 0,
        textShadow: '0 1px 4px rgba(0,0,0,0.5)',
      }}
    >
      D
    </div>
  )
}

const BG_COLORS = {
  huidig: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
  verwacht: 'linear-gradient(180deg, #d1d5db 0%, #9ca3af 100%)',
  werkelijk: 'linear-gradient(180deg, #fed7aa 0%, #f97316 100%)',
  toekomst: 'linear-gradient(180deg, #bbf7d0 0%, #16a34a 100%)',
}

// For the silent/static "verwacht" state skip a live WebGL canvas
// to avoid browser WebGL context limits when two Daan cards are on screen.
function AvatarSilhouette({ width, height, type }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: '50% 50% 40% 40%',
        overflow: 'hidden',
        flexShrink: 0,
        background: BG_COLORS[type] ?? BG_COLORS.verwacht,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        opacity: 0.75,
      }}
    >
      <div style={{
        width: width * 0.44,
        height: width * 0.44,
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.3)',
        boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.3)',
      }} />
      <div style={{
        width: width * 0.6,
        height: height * 0.28,
        borderRadius: '40% 40% 0 0',
        background: 'rgba(0,0,0,0.25)',
      }} />
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function DaanAvatar3D({
  speaking = true,
  width = 72,
  height = 84,
  type = 'huidig',
}) {
  if (type === 'verwacht') {
    return <AvatarSilhouette width={width} height={height} type={type} />
  }

  return (
    <AvatarBoundary fallback={<AvatarFallback3D width={width} height={height} type={type} />}>
      <div
        style={{
          width,
          height,
          borderRadius: '50% 50% 40% 40%',
          overflow: 'hidden',
          flexShrink: 0,
          background: BG_COLORS[type] ?? BG_COLORS.huidig,
        }}
      >
        <Canvas
          camera={{ position: [0, 1.64, 0.5], fov: 30, near: 0.01, far: 10 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.85} />
          <directionalLight position={[1, 2, 1.5]} intensity={1.4} />
          <directionalLight position={[-1, 1, -1]} intensity={0.2} color="#b0c4de" />
          <Suspense fallback={null}>
            <AvatarModel speaking={speaking} />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>
    </AvatarBoundary>
  )
}
