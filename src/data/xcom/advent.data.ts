export const Advent = {
	'Advent Trooper': {
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
				range: 1,
			},
			{
				level: 1,
				type: 'elite',
				health: 1,
				range: 1,
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
				attack: 1,
				range: 1,
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
	'Advent Officer': {
		'base': {
			'health': 6,
			'move': 2,
			'attack': 3,
			'range': 3,
			'attributes': []
		},
		'upgrades': [
			{
				'level': 0,
				'type': 'elite',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 1,
				'type': 'normal',
				'health': 1,
				'range': 1,
			},
			{
				'level': 1,
				'type': 'elite',
				'health': 2,
				'range': 2,
			},
			{
				'level': 2,
				'type': 'normal',
				'health': 1,
				'move': 1,
			},
			{
				'level': 2,
				'type': 'elite',
				'health': 2,
				'move': 1,
				'attack': 1,
			},
			{
				'level': 3,
				'type': 'normal',
				'attack': 1,
			},
			{
				'level': 3,
				'type': 'elite',
				'health': 1,
			},
			{
				'level': 4,
				'type': 'normal',
				'health': 2,
			},
			{
				'level': 4,
				'type': 'elite',
				'attack': 1,
				'range': 1,
			},
			{
				'level': 5,
				'type': 'normal',
				'health': 2,
				'range': 1,
			},
			{
				'level': 5,
				'type': 'elite',
				'health': 2,
				'move': 1,
			},
			{
				'level': 6,
				'type': 'normal',
				'attack': 1,
			},
			{
				'level': 6,
				'type': 'elite',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 7,
				'type': 'normal',
				'health': 3,
			},
			{
				'level': 7,
				'type': 'elite',
				'health': 4,
			}
		]
	},
	'Advent Purifier': {
		'base': {
			'health': 4,
			'move': 2,
			'attack': 1,
			'range': 2,
			'attributes': ['%shield% 1']
		},
		'upgrades': [
			{
				'level': 0,
				'type': 'elite',
				'health': 2,
				'attributes': ['%shield% 1', '%wound%']
			},
			{
				'level': 1,
				'type': 'normal',
				'health': 1,
				'range': 1,
			},
			{
				'level': 1,
				'type': 'elite',
				'health': 1,
				'range': 1,
			},
			{
				'level': 2,
				'type': 'normal',
				'health': 1,
				'move': 1,
			},
			{
				'level': 2,
				'type': 'elite',
				'health': 2,
				'move': 1,
			},
			{
				'level': 3,
				'type': 'normal',
				'attack': 1,
			},
			{
				'level': 3,
				'type': 'elite',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 4,
				'type': 'normal',
				'health': 2,
				'attributes': ['%shield% 1', '%wound%']
			},
			{
				'level': 4,
				'type': 'elite',
				'attack': 1,
			},
			{
				'level': 5,
				'type': 'normal',
				'health': 2,
			},
			{
				'level': 5,
				'type': 'elite',
				'health': 2,
				'move': 1,
				'attributes': ['%shield% 2', '%wound%']
			},
			{
				'level': 6,
				'type': 'normal',
				'attack': 1,
			},
			{
				'level': 6,
				'type': 'elite',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 7,
				'type': 'normal',
				'health': 3,
			},
			{
				'level': 7,
				'type': 'elite',
				'health': 4,
			}
		]
	}
};
