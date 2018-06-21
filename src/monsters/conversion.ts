import { IMonster, IMonsterStats } from './monsters.service';

export class ConversionService {
	monsters: any;
	
	constructor(monsterData) {
		this.monsters = {};
		Object.keys(monsterData).forEach(key => this.monsters[key] = this.normalizeMonsterStats(monsterData[key]));
	}

	private normalizeMonsterStats(monster: Partial<IMonster>): IMonster {
		if (monster.base || monster.upgrades) {
			return monster as IMonster;
		}

		if (!monster.level) {
			throw new Error('No level');
		}

		const levels = monster.level;
		const newMonster: IMonster = {
			base: monster.level[0].normal,
			upgrades: [this.computeUpgrade(monster.level[0].normal, monster.level[0].elite, 0, 'elite')],
		} as any;
		Array.from(new Array(7)).map((x, index) => index + 1).forEach(level => {
			const previousLevel = levels[level - 1] as any;
			const currentLevel = levels[level];
			const normalUpgrade = this.computeUpgrade(previousLevel.normal, currentLevel.normal, level, 'normal');
			const eliteUpgrade = this.computeUpgrade(previousLevel.elite, currentLevel.elite, level, 'elite');
			newMonster.upgrades = [...(newMonster.upgrades as any), normalUpgrade, eliteUpgrade];
		});
		return newMonster;
	}

	private computeUpgrade(previousStats: IMonsterStats, newStats: IMonsterStats | undefined, level: number, type: 'elite' | 'normal'): IMonsterStats {
		if (!newStats) {
			return {
				level,
				type,
			} as any;
		}

		return {
			level,
			type,
			health: newStats.health - previousStats.health,
			move: newStats.move - previousStats.move,
			attack: newStats.attack - previousStats.attack,
			range: newStats.range - previousStats.range,
			attributes: newStats.attributes,
		} as any;
	}
}
