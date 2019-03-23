import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
	input: 'src/index.js',
	plugins: [
		babel(),
		nodeResolve(),
		commonjs()
	],
	output: [{
		file: 'dist/compare.cjs.js',
		format: 'cjs',
	}, {
		file: 'dist/compare.es6.js',
		format: 'esm',
	}],
};
