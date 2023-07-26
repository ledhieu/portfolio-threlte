<script lang="ts">
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
        ToneMappingMode
	} from 'postprocessing';

	const { scene, renderer, camera } = useThrelte();
	const composer = new EffectComposer(renderer);
	const setupEffectComposer = (camera) => {
		composer.addPass(new RenderPass(scene, camera));
		const bloomEffect = new BloomEffect({
            intensity:1,
            luminanceThreshold: 0.9
        })
		composer.addPass(new EffectPass(camera, bloomEffect));
        const noiseEffect = new NoiseEffect({
            blendFunction: BlendFunction.SCREEN,
            premultiply: true
        })
        // composer.addPass(new EffectPass(camera, noiseEffect))
        const toneMappingEffect = new ToneMappingEffect({
            mode: ToneMappingMode.REINHARD2_ADAPTIVE
        })
        // composer.addPass( new EffectPass(camera, toneMappingEffect) );
	};
	$: setupEffectComposer($camera);
	useRender((_, delta) => {
		composer.render(delta);
	});
</script>