<script>
	import { useThrelte, useRender } from '@threlte/core';
	import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
    import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
    import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
    import {FilmPass} from 'three/addons/postprocessing/FilmPass.js';
    import { DotScreenPass } from 'three/addons/postprocessing/DotScreenPass.js'
    // import { HalftonePass } from 'three/addons/postprocessing/HalftonePass.js'
    // import { LUTPass } from 'three/addons/postprocessing/LUTPass.js'
    import { AfterimagePass  } from 'three/addons/postprocessing/AfterimagePass.js'
    import { SSAARenderPass }from 'three/addons/postprocessing/SSAARenderPass.js'
    import { SobelOperatorShader } from 'three/addons/shaders/SobelOperatorShader.js';
    import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
    import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
    import * as THREE from 'three'
    import { getContext, onMount } from 'svelte';

	const { scene, renderer, camera } = useThrelte();
    const darkMode = getContext('darkMode')
	const composer = new EffectComposer(renderer);
    let effectSobel;
	const setupEffectComposer = (camera) => {
        console.log('setting up')
		composer.addPass(new RenderPass(scene, camera));
        const unrealBloomPass = new UnrealBloomPass(
           128, // resolution
           $darkMode ? 1 : 1, // strength
           $darkMode ? 1 : 1, // radius
           $darkMode ? 0.7 : 0.8, // threshold
        );
        composer.addPass(unrealBloomPass)
        const filmPass = new FilmPass(
            0.35,   // noise intensity
            0.025,  // scanline intensity
            648,    // scanline count
            false,  // grayscale
        );
        // filmPass.renderToScreen = true;
        
        // composer.addPass(filmPass);
        // composer.addPass(new DotScreenPass())
        // composer.addPass(new HalftonePass())
        // composer.addPass(new AfterimagePass(0.1))
        // composer.addPass(new SSAARenderPass(scene, camera))

        effectSobel = new ShaderPass( SobelOperatorShader );
        effectSobel.uniforms[ 'resolution' ].value.x = window.innerWidth * window.devicePixelRatio;
        effectSobel.uniforms[ 'resolution' ].value.y = window.innerHeight * window.devicePixelRatio;
        // composer.addPass( effectSobel );

        const outputPass = new OutputPass( THREE.ReinhardToneMapping );
        // composer.addPass(outputPass)
        // outputPass.toneMappingExposure = Math.pow( 1, 4.0 );
	};
	onMount(() => {
        setupEffectComposer($camera);
    })
	useRender((_, delta) => {
		composer.render();
	});
</script>