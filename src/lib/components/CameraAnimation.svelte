<script>
    import { T, useFrame, useThrelte } from '@threlte/core'

    const { screen, renderer, camera } = useThrelte()

    const ACCELERATION = 0.02
    let activeKey = 'default'
    const CHECKPOINTS = {
        default: [0, 2.5, 3],
        far: [0, 6, 12]
    }
    $: target = CHECKPOINTS[activeKey]

    const { start, stop, started } = useFrame(
        () => {
            if(camera.current.position.x != target[0])
                camera.current.position.x += (target[0] - camera.current.position.x) * ACCELERATION
            if(camera.current.position.y != target[1])
                camera.current.position.y += (target[1] - camera.current.position.y) * ACCELERATION
            if(camera.current.position.z != target[2])
                camera.current.position.z += (target[2] - camera.current.position.z) * ACCELERATION
        },
        {
            autostart: true
        }
    )

</script>
