import { MONSTER_STATS } from './data/gloomhaven-monsters';
import { XCOMEnemies } from './data/xcom-enemies';

class MonstersService {
	monsters = {
		monsters: {
			...MONSTER_STATS.monsters,
			...XCOMEnemies,
		},
		bosses: MONSTER_STATS.bosses,
	};
}

export default new MonstersService();