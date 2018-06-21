export const Beasts = {
	'Cave Bear': {
		'base': {
			'health': 7,
			'move': 3,
			'attack': 3,
			'range': 0,
			'attributes': []
		},
		'upgrades': [
			{
				'level': 0,
				'type': 'elite',
				'health': 4,
				'attack': 1,
			},
			{
				'level': 1,
				'type': 'normal',
				'health': 2,
			},
			{
				'level': 1,
				'type': 'elite',
				'health': 3,
			},
			{
				'level': 2,
				'type': 'normal',
				'health': 2,
				'move': 1,
			},
			{
				'level': 2,
				'type': 'elite',
				'health': 3,
				'move': 1,
			},
			{
				'level': 3,
				'type': 'normal',
				'health': 2,
				'attack': 1,
			},
			{
				'level': 3,
				'type': 'elite',
				'health': 3,
				'attack': 1,
			},
			{
				'level': 4,
				'type': 'normal',
				'health': 3,
			},
			{
				'level': 4,
				'type': 'elite',
				'health': 1,
				'move': 1,
				'attributes': ['%wound%']
			},
			{
				'level': 5,
				'type': 'normal',
				'health': 1,
				'move': 1,
			},
			{
				'level': 5,
				'type': 'elite',
				'health': 3,
				'attack': 1,
			},
			{
				'level': 6,
				'type': 'normal',
				'health': 2,
				'attack': 1,
			},
			{
				'level': 6,
				'type': 'elite',
				'health': 4,
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
				'health': 5,
			}
		]
	},
	'Deep Terror': {
		'base': {
			'health': 3,
			'move': 0,
			'attack': 2,
			'range': 0,
			'attributes': []
		},
		'upgrades': [
			{
				'level': 0,
				'type': 'elite',
				'health': 2,
				'attack': 1,
			},
			{
				'level': 1,
				'type': 'normal',
				'health': 1,
				'attributes': ['%retaliate% 1']
			},
			{
				'level': 1,
				'type': 'elite',
				'health': 1,
				'attributes': ['%retaliate% 1']
			},
			{
				'level': 2,
				'type': 'normal',
				'attack': 1,
			},
			{
				'level': 2,
				'type': 'elite',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 3,
				'type': 'normal',
				'health': 1,
				'attributes': ['%retaliate% 2']
			},
			{
				'level': 3,
				'type': 'elite',
				'health': 1,
				'attributes': ['%retaliate% 2']
			},
			{
				'level': 4,
				'type': 'normal',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 4,
				'type': 'elite',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 5,
				'type': 'normal',
				'health': 1,
				'attributes': ['%retaliate% 3']
			},
			{
				'level': 5,
				'type': 'elite',
				'health': 2,
				'attributes': ['%retaliate% 3']
			},
			{
				'level': 6,
				'type': 'normal',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 6,
				'type': 'elite',
				'health': 2,
				'attack': 1,
			},
			{
				'level': 7,
				'type': 'normal',
				'health': 1,
				'attributes': ['%retaliate% 4']
			},
			{
				'level': 7,
				'type': 'elite',
				'health': 2,
				'attributes': ['%retaliate% 4']
			}
		]
	},
	'Giant Viper': {
		'base': {
			'health': 2,
			'move': 2,
			'attack': 1,
			'range': 0,
			'attributes': ['%poison%']
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
			},
			{
				'level': 1,
				'type': 'elite',
				'health': 2,
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
			},
			{
				'level': 4,
				'type': 'elite',
				'health': 3,
			},
			{
				'level': 5,
				'type': 'normal',
				'health': 1,
				'attack': 1,
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
				'health': 1,
				'move': 1,
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
				'health': 2,
			},
			{
				'level': 7,
				'type': 'elite',
				'health': 3,
			}
		]
	},
	'Hound': {
		'base': {
			'health': 4,
			'move': 3,
			'attack': 2,
			'range': 0,
			'attributes': []
		},
		'upgrades': [
			{
				'level': 0,
				'type': 'elite',
				'health': 2,
				'move': 2,
			},
			{
				'level': 1,
				'type': 'normal',
				'move': 1,
				'attributes': ['%retaliate% 1']
			},
			{
				'level': 1,
				'type': 'elite',
				'attributes': ['%retaliate% 2']
			},
			{
				'level': 2,
				'type': 'normal',
				'health': 2,
			},
			{
				'level': 2,
				'type': 'elite',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 3,
				'type': 'normal',
				'health': 2,
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
				'attack': 1,
			},
			{
				'level': 4,
				'type': 'elite',
				'health': 3,
			},
			{
				'level': 5,
				'type': 'normal',
				'health': 1,
				'attributes': ['%retaliate% 2']
			},
			{
				'level': 5,
				'type': 'elite',
				'health': 1,
				'attributes': ['%retaliate% 3']
			},
			{
				'level': 6,
				'type': 'normal',
				'health': 2,
				'move': 1,
			},
			{
				'level': 6,
				'type': 'elite',
				'health': 3,
				'move': 1,
			},
			{
				'level': 7,
				'type': 'normal',
				'health': 4,
			},
			{
				'level': 7,
				'type': 'elite',
				'attack': 1,
				'attributes': ['%retaliate% 4']
			}
		]
	},
	'Lurker': {
		'base': {
			'health': 5,
			'move': 2,
			'attack': 2,
			'range': 0,
			'attributes': ['%target% 2']
		},
		'upgrades': [
			{
				'level': 0,
				'type': 'elite',
				'health': 2,
				'attack': 1,
				'attributes': ['%target% 2', '%shield% 1']
			},
			{
				'level': 1,
				'type': 'normal',
				'health': 2,
				'attributes': ['%target% 2', '%pierce% 1']
			},
			{
				'level': 1,
				'type': 'elite',
				'health': 2,
				'attributes': [
					'%target% 2',
					'%pierce% 1',
					'%shield% 1'
				]
			},
			{
				'level': 2,
				'type': 'normal',
				'health': 2,
				'move': 1,
			},
			{
				'level': 2,
				'type': 'elite',
				'health': 3,
				'move': 1,
				'attributes': [
					'%target% 2',
					'%pierce% 2',
					'%shield% 1'
				]
			},
			{
				'level': 3,
				'type': 'normal',
				'health': 1,
				'attack': 1,
				'attributes': [
					'%target% 2',
					'%pierce% 2'
				]
			},
			{
				'level': 3,
				'type': 'elite',
				'health': 2,
				'attack': 1,
			},
			{
				'level': 4,
				'type': 'normal',
				'attributes': [
					'%target% 2',
					'%pierce% 2',
					'%shield% 1'
				]
			},
			{
				'level': 4,
				'type': 'elite',
				'attributes': [
					'%target% 2',
					'%pierce% 3',
					'%shield% 2'
				]
			},
			{
				'level': 5,
				'type': 'normal',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 5,
				'type': 'elite',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 6,
				'type': 'normal',
				'health': 1,
				'move': 1,
				'attributes': [
					'%target% 2',
					'%pierce% 3',
					'%shield% 1'
				]
			},
			{
				'level': 6,
				'type': 'elite',
				'health': 1,
				'move': 1,
				'attributes': [
					'%target% 2',
					'%pierce% 4',
					'%shield% 2'
				]
			},
			{
				'level': 7,
				'type': 'normal',
				'health': 2,
			},
			{
				'level': 7,
				'type': 'elite',
				'health': 2,
			}
		]
	},
	'Ooze': {
		'base': {
			'health': 4,
			'move': 1,
			'attack': 2,
			'range': 2,
			'attributes': []
		},
		'upgrades': [
			{
				'level': 0,
				'type': 'elite',
				'health': 4,
				'range': 1,
			},
			{
				'level': 1,
				'type': 'normal',
				'health': 1,
				'attributes': ['%shield% 1']
			},
			{
				'level': 1,
				'type': 'elite',
				'health': 1,
				'attributes': ['%shield% 1']
			},
			{
				'level': 2,
				'type': 'normal',
				'health': 2,
				'range': 1,
			},
			{
				'level': 2,
				'type': 'elite',
				'health': 2,
				'attack': 1,
			},
			{
				'level': 3,
				'type': 'normal',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 3,
				'type': 'elite',
				'move': 1,
				'range': 1,
				'attributes': ['%poison%', '%shield% 1']
			},
			{
				'level': 4,
				'type': 'normal',
				'health': 1,
				'move': 1,
			},
			{
				'level': 4,
				'type': 'elite',
				'health': 2,
				'attack': 1,
			},
			{
				'level': 5,
				'type': 'normal',
				'health': 1,
				'attributes': ['%poison%', '%shield% 1']
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
				'health': 2,
				'attack': 1,
			},
			{
				'level': 6,
				'type': 'elite',
				'health': 1,
				'attributes': ['%poison%', '%shield% 2']
			},
			{
				'level': 7,
				'type': 'normal',
				'health': 2,
			},
			{
				'level': 7,
				'type': 'elite',
				'health': 2,
				'attack': 1,
			}
		]
	},
	'Rending Drake': {
		'base': {
			'health': 5,
			'move': 3,
			'attack': 3,
			'range': 0,
			'attributes': []
		},
		'upgrades': [
			{
				'level': 0,
				'type': 'elite',
				'health': 2,
				'move': 1,
				'attack': 1,
			},
			{
				'level': 1,
				'type': 'normal',
				'health': 1,
				'attributes': ['%wound%']
			},
			{
				'level': 1,
				'type': 'elite',
				'attack': 1,
				'attributes': ['%wound%']
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
			},
			{
				'level': 4,
				'type': 'elite',
				'health': 1,
				'move': 1,
			},
			{
				'level': 5,
				'type': 'normal',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 5,
				'type': 'elite',
				'health': 3,
			},
			{
				'level': 6,
				'type': 'normal',
				'health': 1,
				'move': 1,
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
				'health': 3,
			}
		]
	},
	'Spitting Drake': {
		'base': {
			'health': 5,
			'move': 3,
			'attack': 3,
			'range': 3,
			'attributes': ['%flying%']
		},
		'upgrades': [
			{
				'level': 0,
				'type': 'elite',
				'health': 3,
				'attack': 1,
				'range': 1,
			},
			{
				'level': 1,
				'type': 'normal',
				'health': 1,
			},
			{
				'level': 1,
				'type': 'elite',
				'health': 1,
				'attributes': ['%flying%', '%muddle%']
			},
			{
				'level': 2,
				'type': 'normal',
				'health': 2,
				'attributes': ['%flying%', '%muddle%']
			},
			{
				'level': 2,
				'type': 'elite',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 3,
				'type': 'normal',
				'attack': 1,
				'range': 1,
			},
			{
				'level': 3,
				'type': 'elite',
				'health': 2,
				'range': 1,
			},
			{
				'level': 4,
				'type': 'normal',
				'health': 1,
				'move': 1,
			},
			{
				'level': 4,
				'type': 'elite',
				'health': 2,
				'move': 1,
			},
			{
				'level': 5,
				'type': 'normal',
				'health': 3,
			},
			{
				'level': 5,
				'type': 'elite',
				'health': 2,
				'attack': 1,
			},
			{
				'level': 6,
				'type': 'normal',
				'health': 1,
				'attack': 1,
			},
			{
				'level': 6,
				'type': 'elite',
				'health': 3,
			},
			{
				'level': 7,
				'type': 'normal',
				'health': 3,
			},
			{
				'level': 7,
				'type': 'elite',
				'health': 2,
				'attack': 1,
			}
		]
	}
};