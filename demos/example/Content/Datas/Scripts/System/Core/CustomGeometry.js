/*
    RPG Paper Maker Copyright (C) 2017-2021 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/
import { THREE } from "../Globals.js";
import { Vector3 } from "./Vector3.js";
/**
 *  The geometry used to apply vertices + indices + uvs.
 *
 *  @class CustomGeometry
 *  @extends THREE.BufferGeometry
 */
export class CustomGeometry extends THREE.BufferGeometry {
    constructor() {
        super();
        this.b_vertices = [];
        this.b_indices = [];
        this.b_uvs = [];
    }
    /**
     *  Create a BoxGeometry kind CustomGeometry.
     *  @static
     *  @param {number} width
     *  @param {number} height
     *  @param {number} depth
     */
    static createBox(width, height, depth) {
        let geometry = new CustomGeometry();
        let w = width / 2;
        let h = height / 2;
        let d = depth / 2;
        let vecA = new Vector3(-w, -h, -d);
        let vecB = new Vector3(w, -h, -d);
        let vecC = new Vector3(w, -h, d);
        let vecD = new Vector3(-w, -h, d);
        let vecE = new Vector3(-w, h, -d);
        let vecF = new Vector3(w, h, -d);
        let vecG = new Vector3(w, h, d);
        let vecH = new Vector3(-w, h, d);
        geometry.pushQuadVertices(vecA, vecB, vecC, vecD);
        geometry.pushQuadVertices(vecE, vecF, vecG, vecH);
        geometry.pushQuadVertices(vecE, vecH, vecD, vecA);
        geometry.pushQuadVertices(vecF, vecG, vecC, vecB);
        geometry.pushQuadVertices(vecE, vecF, vecB, vecA);
        geometry.pushQuadVertices(vecH, vecG, vecC, vecD);
        geometry.pushQuadIndices(0);
        geometry.pushQuadIndices(4);
        geometry.pushQuadIndices(8);
        geometry.pushQuadIndices(12);
        geometry.pushQuadIndices(16);
        geometry.pushQuadIndices(20);
        geometry.updateAttributes();
        return geometry;
    }
    /**
     *  Set UVs tex for a classic quad according to x y w h values.
     *  @static
     *  @param {number} x
     *  @param {number} y
     *  @param {number} w
     *  @param {number} h
     */
    static uvsQuadToTex(texA, texB, texC, texD, x, y, w, h) {
        texA.set(x, y);
        texB.set(x + w, y);
        texC.set(x + w, y + h);
        texD.set(x, y + h);
    }
    /**
     *  Get the vertices numbers array.
     *  @returns {ArrayLike<number>}
     */
    getVertices() {
        return this.getAttribute('position').array;
    }
    /**
     *  Get the indices numbers array.
     *  @returns {ArrayLike<number>}
     */
    getIndices() {
        return this.getIndex().array;
    }
    /**
     *  Get the uvs numbers array.
     *  @returns {ArrayLike<number>}
     */
    getUVs() {
        return this.getAttribute('uv').array;
    }
    /**
     *  Get the normals numbers array.
     *  @returns {ArrayLike<number>}
     */
    getNormals() {
        return this.getAttribute('normal').array;
    }
    /**
     *  Push vertices for triangle geometries.
     *  @param {Core.Vector3} vecA
     *  @param {Core.Vector3} vecB
     *  @param {Core.Vector3} vecC
     */
    pushTriangleVertices(vecA, vecB, vecC) {
        this.b_vertices.push(vecA.x, vecA.y, vecA.z);
        this.b_vertices.push(vecB.x, vecB.y, vecB.z);
        this.b_vertices.push(vecC.x, vecC.y, vecC.z);
    }
    /**
     *  Push indices for triangle geometries.
     *  @param {number} count
     */
    pushTriangleIndices(count) {
        this.b_indices.push(count, count + 1, count + 2);
    }
    /**
     *  Push UVs for triangle geometries.
     *  @param {Core.Vector2} texA
     *  @param {Core.Vector2} texB
     *  @param {Core.Vector2} texC
     *  @param {Core.Vector2} texD
     */
    pushTriangleUVs(texA, texB, texC) {
        this.b_uvs.push(texA.x, texA.y);
        this.b_uvs.push(texB.x, texB.y);
        this.b_uvs.push(texC.x, texC.y);
    }
    /**
     *  Push vertices for quad geometries.
     *  @param {Core.Vector3} vecA
     *  @param {Core.Vector3} vecB
     *  @param {Core.Vector3} vecC
     *  @param {Core.Vector3} vecD
     */
    pushQuadVertices(vecA, vecB, vecC, vecD) {
        this.b_vertices.push(vecA.x, vecA.y, vecA.z);
        this.b_vertices.push(vecB.x, vecB.y, vecB.z);
        this.b_vertices.push(vecC.x, vecC.y, vecC.z);
        this.b_vertices.push(vecD.x, vecD.y, vecD.z);
    }
    /**
     *  Push indices for quad geometries.
     *  @param {number} count
     */
    pushQuadIndices(count) {
        this.b_indices.push(count, count + 1, count + 2);
        this.b_indices.push(count, count + 2, count + 3);
    }
    /**
     *  Push UVs for quad geometries.
     *  @param {Core.Vector2} texA
     *  @param {Core.Vector2} texB
     *  @param {Core.Vector2} texC
     *  @param {Core.Vector2} texD
     */
    pushQuadUVs(texA, texB, texC, texD) {
        this.b_uvs.push(texA.x, texA.y);
        this.b_uvs.push(texB.x, texB.y);
        this.b_uvs.push(texC.x, texC.y);
        this.b_uvs.push(texD.x, texD.y);
    }
    /**
     *  Update uvs buffer geometry attribute.
     */
    updateUVs() {
        this.setAttribute('uv', new THREE.Float32BufferAttribute(this.b_uvs, 2));
        this.b_uvs = [];
    }
    /**
     *  Update vertices, indices, and uvs buffer geometry attributes.
     */
    updateAttributes() {
        this.setAttribute('position', new THREE.Float32BufferAttribute(this
            .b_vertices, 3));
        this.b_vertices = [];
        this.setIndex(this.b_indices);
        this.b_indices = [];
        this.updateUVs();
        this.computeVertexNormals();
    }
}
