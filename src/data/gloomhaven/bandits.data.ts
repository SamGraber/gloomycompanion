export const Bandits = {
	'Bandit Archer': {
		base: {
			'health': 4,
			'move': 2,
			'attack': 2,
			'range': 3,
			'attributes': []
		},
		upgrades: [
			{
				level: 1,
				type: 'normal',
				health: 1,
				range: 1,
			},
			{
				level: 2,
				type: 'normal',
				health: 1,
				move: 1,
			},
			{
				level: 3,
				type: 'normal',
				attack: 1,
			},
			{
				level: 4,
				type: 'normal',
				health: 2,
			},
			{
				level: 5,
				type: 'normal',
				health: 2,
				range: 1,
			},
			{
				level: 6,
				type: 'normal',
				attack: 1,
			},
			{
				level: 7,
				type: 'normal',
				health: 3,
			},
			{
				level: 0,
				type: 'elite',
				health: 2,
				attack: 1,
			},
			{
				level: 1,
				type: 'elite',
				health: 1,
				range: 2,
			},
			{
				level: 2,
				type: 'elite',
				health: 2,
				move: 1,
			},
			{
				level: 3,
				type: 'elite',
				health: 1,
				attack: 1,
			},
			{
				level: 4,
				type: 'elite',
				range: 1,
				attributes: ['%poison%'],
			},
			{
				level: 5,
				type: 'elite',
				health: 2,
				move: 1,
			},
			{
				level: 6,
				type: 'elite',
				health: 1,
				attack: 1,
			},
			{
				level: 7,
				type: 'elite',
				health: 4,
			},
		],
	},
	'Bandit Guard': {
		base: {
			'health': 5,
			'move': 2,
			'attack': 2,
			'range': 0,
			'attributes': []
		},
		upgrades: [
			{
				level: 1,
				type: 'normal',
				health: 1,
				move: 1,
			},
			{
				level: 2,
				type: 'normal',
				attack: 1,
			},
			{
				level: 3,
				type: 'normal',
				health: 3,
			},
			{
				level: 4,
				type: 'normal',
				health: 1,
				move: 1,
			},
			{
				level: 5,
				type: 'normal',
				health: 1,
				attack: 1,
			},
			{
				level: 6,
				type: 'normal',
				health: 3,
			},
			{
				level: 7,
				type: 'normal',
				health: 2,
				move: 1,
			},
			{
				level: 0,
				type: 'elite',
				health: 4,
				attack: 1,
			},
			{
				level: 1,
				type: 'elite',
				attributes: ['%shield% 1'],
			},
			{
				level: 2,
				type: 'elite',
				health: 1,
				attack: 1,
			},
			{
				level: 3,
				type: 'elite',
				move: 1,
				attributes: ['%shield% 2'],
			},
			{
				level: 4,
				type: 'elite',
				health: 1,
				attributes: ['%muddle%', '%shield% 2'],
			},
			{
				level: 5,
				type: 'elite',
				health: 1,
				attack: 1,
			},
			{
				level: 6,
				type: 'elite',
				health: 2,
				move: 1,
			},
			{
				level: 7,
				type: 'elite',
				move: -1,
				attributes: ['%muddle%', '%shield% 3'],
			},
		],
	},
};
