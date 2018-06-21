import { MonsterClass } from '../monster-class';

export const XCOMDecks: {[key: string]: { name: string, class?: MonsterClass, groupHeader?: boolean }} = {   
	'XCOM':  			  {name: 'XCOM', groupHeader: true },
	'Advent Trooper':  	  {name: 'Advent Trooper', class: 'Archer' },
};