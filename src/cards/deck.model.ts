import { MonsterClass } from './monster-class';

export interface IDeck {
	name: string;
	class: MonsterClass;
	level?: number;
}

export interface IDeckDefinition {
	class: MonsterClass;
	cards: any[];
}
