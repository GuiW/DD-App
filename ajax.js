var app = new Vue({
  el: "#app",
  data: {
    monsters: "",
    monsterURL: "",
    the_monster:{},
    loading: false
  },

  mounted(){
    let self = this;
    $.getJSON("http://www.dnd5eapi.co/api/monsters", function(data){
      self.monsters = data.results;
    })
  },

  methods: {
    getAjaxRequest(){
      let self = this;

      $.getJSON(this.monsterURL, function(data){
        self.the_monster = data;
        self.loading = true;
      })
    },

    RollTheDice(atck_bonus, dmg_dice, dmg_bonus){

      var Rolling = function(multiplier,dice) {
        return multiplier * Math.floor((Math.random() * dice) + 1);
      }

      var nbrs = dmg_dice.match(/\d+/g);
      console.log(nbrs);

      var nbDices01 = nbrs[0];
      var dice01 = nbrs[1];
      var nbDices02 = nbrs[2];
      var dice02 = nbrs[3];

      if (nbDices02) {
        var res = Rolling(nbDices01, dice01) + " + " + Rolling(nbDices02, dice02);

        console.log(dmg_dice + " = " + res)
      }

      else {
        var res = Rolling(nbDices01, dice01);
        console.log(dmg_dice + " = " + res)
      }
    }
  }
})