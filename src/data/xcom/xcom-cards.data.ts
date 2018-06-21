import { MonsterClass } from '../../cards/monster-class';

export const XCOMDecks: {[key: string]: { name: string, class?: MonsterClass, groupHeader?: boolean }} = {   
	'XCOM':  			  {name: 'XCOM', groupHeader: true },
	'Advent Trooper':  	  {name: 'Advent Trooper', class: 'Archer' },
	'Advent Officer':  	  {name: 'Advent Officer', class: 'Officer' },
	'Advent Purifier': 	  {name: 'Advent Purifier', class: 'Purifier' },
};

export const XCOMClasses: { class: MonsterClass, cards: any[] }[] = [
	{ class: 'Officer'
        , cards:
		[ [true,  '10', '* Mark target enemy', '* <span class="small"> All Advent monster types always target the marked enemy and gain advantage. </span>']
		, [true,  '10', '* Mark target enemy', '* <span class="small"> All Advent monster types always target the marked enemy and gain advantage. </span>']
		, [false, '15', '* %move% -1', '* %attack% -1']
		, [false, '27', '* %move% +0', '* %attack% +0']
		, [false, '27', '* %move% +0', '* %attack% +0']
		, [false, '31', '* %move% -1', '* %attack% +1']
		, [false, '39', '* %move% -1', '* %attack% +0', '* %heal% 1', '** Self']
		, [false, '71', '* %move% +1', '* %attack% +1']
		]
	},
	{ 
		class: 'Purifier',
		cards:
		[ [false, '10', '* %move% +1', '* %attack% +0', '** %range% +0','* %fire%', '* On Death:', '** %attack% +2 %aoe-circle-with-middle-black%']
		, [false, '14', '* %move% +0', '* %attack% +0', '** %range% +0','* %fire%', '* On Death:', '** %attack% +2 %aoe-circle-with-middle-black%']
		, [true,  '84', '* %attack% +0', '** %range% +0', '** %aoe-circle%']
		, [false, '49', '* %attack% +1 %aoe-line-3-with-black%']
		, [false, '67', '* %move% -1', '* %attack% +1', '** %range% -1', '* %fire%']
		, [false, '77', '* %attack% +1', '** Target all adjacent enemies']
		, [true,  '30', '* <span class="small">All adjacent enemies<br/>suffer 2 damage.</span>', '* %move% +0', '* %attack% -2', '** %range% +0', '** %wound%', '** %target% 2']
		, [false, '08', '* %move% -1', '* <span class="small"> Create a 4 damage trap in an adjacent empty hex closest to an enemy </span>', '* %fire%']
		]
	},
];