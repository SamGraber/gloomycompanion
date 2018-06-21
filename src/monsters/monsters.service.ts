import {
	Bandits,
	Beasts,
	Bosses,
	CityEnemies,
	Demons,
	Harrowers,
	Imps,
	MechanicalMonsters,
	SavvasEnemies,
	Undead,
} from '../data/gloomhaven';
import { Advent } from '../data/xcom';

interface IMonsterCollection {
	monsters: { [key: string]: IMonster };
	bosses: { [key: string]: any };
}

interface IMonster {
	level: {
		level: number;
		normal: IMonsterStats;
		elite: IMonsterStats;
	}[];
	base?: IMonsterStats;
	upgrades?: {
		level: number;
		type: 'normal' | 'elite';
		health: number;
		move: number;
		attack: number;
		range: number;
		attributes: string[];
	}[];
}

interface IMonsterStats {
	health: number;
	move: number;
	attack: number;
	range: number;
	attributes: string[];
}

class MonstersService {
	monsters: IMonsterCollection;

	constructor() {
		this.monsters = {
			monsters: {},
			bosses: Bosses,
		};
		const monsterData = {
			...Bandits,
			...Beasts,
			...CityEnemies,
			...Demons,
			...Harrowers,
			...Imps,
			...MechanicalMonsters,
			...SavvasEnemies,
			...Undead,
			
			...Advent,
		};
		Object.keys(monsterData).forEach(key => {
			this.monsters.monsters[key] = this.denormalizeMonsterStats(monsterData[key]);
		});
	}

	private denormalizeMonsterStats(monster: Partial<IMonster>): IMonster {
		if (monster.level) {
			return monster as IMonster;
		}

		if (!monster.base || !monster.upgrades) {
			throw new Error('You must define the base and upgrade stats or define the full stats sheet');
		}
		
		const upgrades = monster.upgrades;
		const newMonster: IMonster = {
			level: [{
				level: 0,
				normal: monster.base,
				elite: this.applyUpgrade(monster.base, upgrades.find(x => x.level === 0 && x.type === 'elite')),
			}],
		};
		Array.from(new Array(7)).map((x, index) => index + 1).forEach(level => {
			const previousLevel = newMonster.level[level - 1] as any;
			const newLevel = {
				level,
				normal: this.applyUpgrade(previousLevel.normal, upgrades.find(x => x.level === level && x.type === 'normal')),
				elite: this.applyUpgrade(previousLevel.elite, upgrades.find(x => x.level === level && x.type === 'elite')),
			};
			newMonster.level = [...newMonster.level, newLevel];
		});
		return newMonster;
	}

	private applyUpgrade(previousStats: IMonsterStats, upgrades: IMonsterStats | undefined): IMonsterStats {
		if (!upgrades) {
			return previousStats;
		}

		return {
			health: upgrades.health ? previousStats.health + upgrades.health : previousStats.health,
			move: upgrades.move ? previousStats.move + upgrades.move : previousStats.move,
			attack: upgrades.attack ? previousStats.attack + upgrades.attack : previousStats.attack,
			range: upgrades.range ? previousStats.range + upgrades.range : previousStats.range,
			attributes: upgrades.attributes ? upgrades.attributes : previousStats.attributes,
		};
	}
}

export default new MonstersService();