export const MechanicalMonsters = {
	'Ancient Artillery': {
		base: {
			'health': 4,
			'move': 0,
			'attack': 2,
			'range': 4,
			'attributes': [],
		},
		upgrades: [
			{
				level: 1,
				type: 'normal',
				health: 2,
			},
			{
				level: 2,
				type: 'normal',
				health: 1,
				range: 1,
			},
			{
				level: 3,
				type: 'normal',
				health: 1,
				attack: 1,
			},
			{
				level: 4,
				type: 'normal',
				health: 1,
				attack: 1,
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
				health: 3,
			},
			{
				level: 7,
				type: 'normal',
				health: 2,
				range: 1,
			},
			{
				level: 0,
				type: 'elite',
				health: 3,
				attack: 1,
				range: 1,
			},
			{
				level: 1,
				type: 'elite',
				health: 2,
			},
			{
				level: 2,
				type: 'elite',
				health: 2,
				range: 1,
			},
			{
				level: 3,
				type: 'elite',
				health: 2,
				attack: 1,
			},
			{
				level: 4,
				type: 'elite',
				attributes: ['%target% 2'],
			},
			{
				level: 5,
				type: 'elite',
				health: 2,
				range: 1,
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
	'Stone Golem': {
		'level': [
		  {
			'level': 0,
			'normal': {
			  'health': 10,
			  'move': 1,
			  'attack': 3,
			  'range': 0,
			  'attributes': []
			},
			'elite': {
			  'health': 10,
			  'move': 2,
			  'attack': 4,
			  'range': 0,
			  'attributes': [
				'%shield% 1'
			  ]
			}
		  },
		  {
			'level': 1,
			'normal': {
			  'health': 10,
			  'move': 1,
			  'attack': 3,
			  'range': 0,
			  'attributes': [
				'%shield% 1'
			  ]
			},
			'elite': {
			  'health': 11,
			  'move': 2,
			  'attack': 4,
			  'range': 0,
			  'attributes': [
				'%shield% 2'
			  ]
			}
		  },
		  {
			'level': 2,
			'normal': {
			  'health': 11,
			  'move': 1,
			  'attack': 4,
			  'range': 0,
			  'attributes': [
				'%shield% 1'
			  ]
			},
			'elite': {
			  'health': 14,
			  'move': 2,
			  'attack': 5,
			  'range': 0,
			  'attributes': [
				'%shield% 2'
			  ]
			}
		  },
		  {
			'level': 3,
			'normal': {
			  'health': 11,
			  'move': 1,
			  'attack': 4,
			  'range': 0,
			  'attributes': [
				'%shield% 2'
			  ]
			},
			'elite': {
			  'health': 15,
			  'move': 2,
			  'attack': 5,
			  'range': 0,
			  'attributes': [
				'%shield% 3'
			  ]
			}
		  },
		  {
			'level': 4,
			'normal': {
			  'health': 12,
			  'move': 2,
			  'attack': 4,
			  'range': 0,
			  'attributes': [
				'%shield% 2'
			  ]
			},
			'elite': {
			  'health': 17,
			  'move': 2,
			  'attack': 6,
			  'range': 0,
			  'attributes': [
				'%shield% 3'
			  ]
			}
		  },
		  {
			'level': 5,
			'normal': {
			  'health': 13,
			  'move': 2,
			  'attack': 5,
			  'range': 0,
			  'attributes': [
				'%shield% 2'
			  ]
			},
			'elite': {
			  'health': 19,
			  'move': 3,
			  'attack': 6,
			  'range': 0,
			  'attributes': [
				'%shield% 3'
			  ]
			}
		  },
		  {
			'level': 6,
			'normal': {
			  'health': 16,
			  'move': 2,
			  'attack': 5,
			  'range': 0,
			  'attributes': [
				'%shield% 2'
			  ]
			},
			'elite': {
			  'health': 20,
			  'move': 3,
			  'attack': 7,
			  'range': 0,
			  'attributes': [
				'%shield% 3'
			  ]
			}
		  },
		  {
			'level': 7,
			'normal': {
			  'health': 16,
			  'move': 2,
			  'attack': 5,
			  'range': 0,
			  'attributes': [
				'%shield% 3'
			  ]
			},
			'elite': {
			  'health': 21,
			  'move': 3,
			  'attack': 7,
			  'range': 0,
			  'attributes': [
				'%shield% 4'
			  ]
			}
		  }
		]
	  },
};