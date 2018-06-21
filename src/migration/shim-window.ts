import CardService from '../cards/cards.service';
import MonsterService from '../monsters/monsters.service';

(window as any).DECKS = CardService.decks;
(window as any).MONSTER_STATS = MonsterService.monsters;
