import * as THREE from 'three';

export default class Smoke {
	textures: any[];
	webgl: any;
	scene: any;
	cloudParticles: any
	amount: number
	meshs: any[]

	private textures_path: string[];


	constructor(args: any) {
		this.scene = args.scene;
		this.webgl = args.webgl;

		this.textures_path = [
			'/smoke-green.png',
		];

		this.amount = 15 / this.textures_path.length; //amount of each shap
		this.meshs = [];
		this.load()
	}

	async load() {
		const promises = this.textures_path.map(path => this.webgl.loader.loadTexture(path));
		const textures = await Promise.all(promises);
		this.textures = textures;

		textures.forEach((texture, j) => {

			const geometry = new THREE.PlaneGeometry(5,5);
			geometry.computeVertexNormals();

			texture.magFilter = THREE.NearestFilter;
			texture.minFilter = THREE.NearestFilter;

			// const material = new THREE.MeshLambertMaterial({

			// 	map: texture,
			// 	side: THREE.DoubleSide,
			// 	alphaTest: 0.1,
			// 	//color: 0xFFFFFF
			// });

			const material = new THREE.MeshBasicMaterial({
				map: texture,
				blending: THREE.AdditiveBlending,
				side: THREE.DoubleSide,
				alphaTest: 0.1,
				transparent: true,
				opacity:0.5,
			});


			const randomizeMatrix = (matrix) => {
				const position = new THREE.Vector3();
				const rotation = new THREE.Euler();
				const quaternion = new THREE.Quaternion();
				const scale = new THREE.Vector3();
				// console.log(matrix)
				position.x = Math.random() * 10 - 9;
				position.y = Math.random() * (2 - 1.6) + 1;
				position.z = Math.random() * 30 - 20;

				rotation.x = - Math.PI / 3;
				// rotation.x = Math.random() * 2 * Math.PI;
				// rotation.y = Math.random() * 2 * Math.PI;
				// rotation.z = Math.random() * 2 * Math.PI;
				quaternion.setFromEuler(rotation);
				scale.x = scale.y = scale.z = 0.9 + Math.random() * 0.3;
				matrix.compose(position, quaternion, scale);
			};


			const matrix = new THREE.Matrix4();
			const mesh = new THREE.InstancedMesh(geometry, material, this.amount);

			mesh.defaultHeights = [];


			for (let i = 0; i < this.amount; i++) {
				randomizeMatrix(matrix);
				mesh.setMatrixAt(i, matrix);
				mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

				const position = new THREE.Vector3();
				matrix.decompose(position, new THREE.Quaternion(), new THREE.Vector3());
				mesh.defaultHeights[i] = position.y
				// console.log(mesh)
			}

			this.meshs[j] = mesh;

			this.scene.instance.add(this.meshs[j]);

		})



	}


	update = () => {



		this.meshs.forEach((mesh) => {

			const time = Date.now() * 0.001;

			// this.scene.camera.position this.mesh.position;

			// mesh.getMatrixAt(i, matrix);
			// matrix.decompose(transform.position, transform.quaternion, transform.scale);
			// transform.quaternion.copy(camera.quaternion);
			// transform.updateMatrix();
			// mesh.setMatrixAt(i, transform.matrix);

			const matrix = new THREE.Matrix4();
			const transform = new THREE.Object3D();


			for (let i = 0; i < this.amount; i++) {
				mesh.getMatrixAt(i, matrix);
				matrix.decompose(transform.position, transform.quaternion, transform.scale);
				transform.position.y = mesh.defaultHeights[i] + Math.sin((time + i) / 20);
				
				transform.quaternion.copy(this.scene.webgl.camera.instance.quaternion);
				transform.updateMatrix();
				mesh.setMatrixAt(i, transform.matrix);
			}

			//this.mesh.rotation.x = Math.sin( time / 4 );
			// this.mesh.position.y = Math.sin(time / 5);
			mesh.instanceMatrix.needsUpdate = true;
		});

	}
}