<script>
	import { useThrelte, useRender } from '@threlte/core';
	import {
		EffectComposer,
		EffectPass,
		RenderPass,
		OutlineEffect,
        BloomEffect,
		BlendFunction,
        NoiseEffect,
        ToneMappingEffect,
        ToneMappingMode,
		GodRaysEffect
	} from 'postprocessing';
    import { getContext } from 'svelte';

	const { scene, renderer, camera } = useThrelte();
	const darkMode = getContext('darkMode')
	const composer = new EffectComposer(renderer);
	const setupEffectComposer = (camera) => {
		composer.addPass(new RenderPass(scene, camera));
		const bloomEffect = new BloomEffect({
            intensity: 1.15 ,
			kernelSize: 5,
            luminanceThreshold: 0.8
        })
		composer.addPass(new EffectPass(camera, bloomEffect));
        const noiseEffect = new NoiseEffect({
            blendFunction: BlendFunction.SCREEN,
            premultiply: true
        })
        // composer.addPass(new EffectPass(camera, noiseEffect))
        const toneMappingEffect = new ToneMappingEffect({
            mode: ToneMappingMode.REINHARD
        })

		// const godRaysEffect = new GodRaysEffect(camera)
		// composer.addPass( new EffectPass(camera, godRaysEffect) )
        // composer.addPass( new EffectPass(camera, toneMappingEffect) );
	};
	$: setupEffectComposer($camera);
	useRender((_, delta) => {
		composer.render(delta);
	});
</script>