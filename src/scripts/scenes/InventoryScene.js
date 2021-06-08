import items from "./Items.js";

export default class InventoryScene extends Phaser.Scene {
	constructor(){
		super("InventoryScene");
		this.rows = 2;
		this.uiScale = 1.5;
		this.gridSpacing = 4;
		this.margin = 8;
		this._tileSize = 32;
		this.inventorySlots= [];
	}

	init(data){
		let { gameScene } = data;
		this.gameScene = gameScene;
		this.inventory = gameScene.inventory;
		this.maxColumns = 6;
		this.maxRows = 3;
		this.inventory.subscribe(() => this.refresh());
	}

	get tileSize(){
		return this._tileSize * this.uiScale;
	}

	destroyInventorySlot(InventorySlot){
		if(InventorySlot.item) InventorySlot.item.destroy();
		if(InventorySlot.quantityText) InventorySlot.quantityText.destroy();
		InventorySlot.destroy();
	}

	refresh(){
		this.inventorySlots.forEach ( s => this.destroyInventorySlot(s));
		this.inventorySlots = [];
		for (let index = 0; index < this.maxColumns * this.rows; index++) {
			let x = this.margin + this.tileSize / 0.11 + (index % this.maxColumns) * (this.tileSize + this.gridSpacing);
			let y = this.margin + this.tileSize / 0.074  + Math.floor(index/this.maxColumns) * (this.tileSize + this.gridSpacing);
			let InventorySlot = this.add.sprite(x,y, "items", 11);
			InventorySlot.setScale(this.uiScale);
			InventorySlot.depth = -1;

			InventorySlot.setInteractive();
			InventorySlot.on("pointerover", pointer =>{
			console.log('pointerover:${index}');
			this.hoverIndex = index;
		});

			let item = this.inventory.getItem(index);
		if(item){
			InventorySlot.item = this.add.sprite(InventorySlot.x,InventorySlot.y, "items",items[item.name].frame);
			InventorySlot.quantityText = this.add.text(InventorySlot.x,InventorySlot.y + this.tileSize/6,item.quantity,{
				font: "11px Courier",
				fill: "#111"
			}).setOrigin(0.5,0);
			//dragging
			InventorySlot.item.setInteractive();
			this.input.setDraggable(InventorySlot.item);
		} 
		this.inventorySlots.push(InventorySlot);

			}
		this.updateSelected();
		}

	updateSelected(){
		for (let index = 0; index < this.maxColumns; index++) {
		this.inventorySlots[index].tint = this.inventory.selected === index ? 0xffff00 : 0xffffff;
		}
	}

	create() {

		//selection
		this.input.on("wheel",(pointer,gameObjects,deltaX,deltaY,deltaZ) =>{
		this.inventory.selected = Math.max(0,this.inventory.selected + (deltaY > 0 ? 1 :-1)) % this.maxColumns;
		this.updateSelected();
		});

		this.input.keyboard.on("keydown-I",()=>{
		this.rows = this.rows === 1 ? this.maxRows : 1;
		this.refresh();

		});

		//DRAGGING
		this.input.setTopOnly(false);
		this.input.on("dragstart",()=>{
		console.log("dragstart");
		this.startIndex = this.hoverIndex;
		this.inventorySlots[this.startIndex].quantityText.destroy();
		})

		this.input.on("drag",(pointer,gameObject,dragX,dragY) => {
			gameObject.x = dragX;
			gameObject.y = dragY;
		});

		this.input.on("dragend", () => {
		this.inventory.moveItem(this.startIndex,this.hoverIndex);
		this.refresh();
		});

		this.refresh();
	}

	
}

		