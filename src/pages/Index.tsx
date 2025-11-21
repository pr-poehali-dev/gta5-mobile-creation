import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Index = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    scene.fog = new THREE.Fog(0x87CEEB, 50, 200);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 100, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    scene.add(directionalLight);

    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x404040,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const roadGeometry = new THREE.PlaneGeometry(10, 500);
    const roadMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333,
      roughness: 0.9
    });
    const road1 = new THREE.Mesh(roadGeometry, roadMaterial);
    road1.rotation.x = -Math.PI / 2;
    road1.position.y = 0.01;
    road1.receiveShadow = true;
    scene.add(road1);

    const road2 = new THREE.Mesh(roadGeometry, roadMaterial);
    road2.rotation.x = -Math.PI / 2;
    road2.rotation.z = Math.PI / 2;
    road2.position.y = 0.01;
    road2.receiveShadow = true;
    scene.add(road2);

    const lineGeometry = new THREE.BoxGeometry(0.3, 0.02, 2);
    const lineMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    for (let i = -200; i < 200; i += 8) {
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.position.set(0, 0.02, i);
      scene.add(line);
    }

    const createBuilding = (x: number, z: number, width: number, height: number, depth: number, color: number) => {
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshStandardMaterial({ 
        color,
        roughness: 0.7,
        metalness: 0.3
      });
      const building = new THREE.Mesh(geometry, material);
      building.position.set(x, height / 2, z);
      building.castShadow = true;
      building.receiveShadow = true;
      scene.add(building);

      const windowGeometry = new THREE.BoxGeometry(width * 0.8, 0.5, 0.1);
      const windowMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x88CCFF,
        emissive: 0x4488AA,
        emissiveIntensity: 0.3
      });
      
      for (let i = 2; i < height; i += 3) {
        const windowFront = new THREE.Mesh(windowGeometry, windowMaterial);
        windowFront.position.set(x, i, z + depth / 2 + 0.05);
        scene.add(windowFront);
        
        const windowBack = new THREE.Mesh(windowGeometry, windowMaterial);
        windowBack.position.set(x, i, z - depth / 2 - 0.05);
        scene.add(windowBack);
      }
    };

    createBuilding(-30, -20, 15, 40, 15, 0x8B4513);
    createBuilding(-30, 20, 12, 35, 12, 0x696969);
    createBuilding(30, -25, 10, 50, 10, 0x4A4A4A);
    createBuilding(30, 15, 18, 30, 18, 0x5C4033);
    createBuilding(-50, -50, 8, 25, 8, 0x708090);
    createBuilding(50, 50, 14, 45, 14, 0x36454F);
    createBuilding(-25, 50, 10, 28, 10, 0x483D8B);
    createBuilding(45, -50, 12, 38, 12, 0x2F4F4F);

    const treeGeometry = new THREE.CylinderGeometry(0.5, 0.5, 4, 8);
    const treeMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const leavesGeometry = new THREE.SphereGeometry(3, 8, 8);
    const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });

    const createTree = (x: number, z: number) => {
      const trunk = new THREE.Mesh(treeGeometry, treeMaterial);
      trunk.position.set(x, 2, z);
      trunk.castShadow = true;
      scene.add(trunk);

      const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
      leaves.position.set(x, 5, z);
      leaves.castShadow = true;
      scene.add(leaves);
    };

    createTree(-15, -40);
    createTree(-18, 35);
    createTree(15, -35);
    createTree(20, 40);

    const playerGeometry = new THREE.CapsuleGeometry(0.5, 1.5, 8, 16);
    const playerMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x0EA5E9,
      roughness: 0.5,
      metalness: 0.5
    });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(0, 1.25, 0);
    player.castShadow = true;
    scene.add(player);

    const headGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFDBAC,
      roughness: 0.8
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 2.5, 0);
    head.castShadow = true;
    scene.add(head);

    camera.position.set(0, 5, 10);
    camera.lookAt(0, 1, 0);

    const keys: { [key: string]: boolean } = {};
    const playerSpeed = 0.15;
    let playerRotation = 0;

    window.addEventListener('keydown', (e) => {
      keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener('keyup', (e) => {
      keys[e.key.toLowerCase()] = false;
    });

    const animate = () => {
      requestAnimationFrame(animate);

      let moved = false;

      if (keys['w'] || keys['arrowup']) {
        player.position.z -= playerSpeed * Math.cos(playerRotation);
        player.position.x -= playerSpeed * Math.sin(playerRotation);
        moved = true;
      }
      if (keys['s'] || keys['arrowdown']) {
        player.position.z += playerSpeed * Math.cos(playerRotation);
        player.position.x += playerSpeed * Math.sin(playerRotation);
        moved = true;
      }
      if (keys['a'] || keys['arrowleft']) {
        playerRotation += 0.05;
        moved = true;
      }
      if (keys['d'] || keys['arrowright']) {
        playerRotation -= 0.05;
        moved = true;
      }

      player.rotation.y = playerRotation;
      head.position.x = player.position.x;
      head.position.z = player.position.z;

      const cameraDistance = 10;
      const cameraHeight = 5;
      camera.position.x = player.position.x + cameraDistance * Math.sin(playerRotation);
      camera.position.z = player.position.z + cameraDistance * Math.cos(playerRotation);
      camera.position.y = player.position.y + cameraHeight;
      camera.lookAt(player.position.x, player.position.y + 1, player.position.z);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', () => {});
      window.removeEventListener('keyup', () => {});
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-screen overflow-hidden" />
  );
};

export default Index;
