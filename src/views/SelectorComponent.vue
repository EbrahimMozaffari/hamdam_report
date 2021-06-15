<template>
  <v-row>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <label @click="selectAll" v-on="on" for=""
          >{{ selectorData.title }} :</label
        >
      </template>
      <ul class="toolTipIcon">
        <li v-for="(item, index) in selectorData.names" :key="index">
          <v-icon v-html="`${selectorData.icons[index]} mdi-light`"></v-icon>
          {{ selectorData.names[index] }}
        </li>
      </ul>
    </v-tooltip>

    <v-checkbox
      v-for="(item, index) in selectorData.names"
      :key="index"
      class="mt-0"
      v-model="dataModel"
      color="success"
      :off-icon="`${selectorData.icons[index]}`"
      :on-icon="`${selectorData.icons[index]}`"
      :value="`${selectorData.values[index]}`"
      @change="over(dataModel)"
    ></v-checkbox>

    <span class="percent" v-if="allDataModel[selectorData.dataModelName]">
         <v-icon color="indigo">mdi-human-female</v-icon>
         <span v-if="femalePercent">{{femalePercent}} %</span>
         
         <v-icon color="indigo">mdi-human-male </v-icon>
         <span v-if="malePercent">{{malePercent}} %</span>
      <!-- {{ allDataModel[selectorData.dataModelName] }} % -->
    </span>
  </v-row>
</template>

<script>
export default {
  name: "SelectorComponent",
  props: ["selectorData"],
  data() {
    return {
      dataModel: [],
      malePercent:null,
      femalePercent:null,
    };
  },
  methods: {
    over(val) {
      this.sendSingleData();
      this.$emit("over", {
        dataModelName: this.selectorData.dataModelName,
        value: val,
      });
    },
    selectAll() {
      this.dataModel = [];
      this.selectorData.values.forEach((element) => {
        this.dataModel.push(element);
      });
      this.sendSingleData();
      this.$emit("over", {
        dataModelName: this.selectorData.dataModelName,
        value: this.dataModel,
      });
    },
    sendSingleData() {
      //this.dataModel
      this.$store.dispatch("app/sendSingleData", {
        dataModelName: this.selectorData.dataModelName,
        value: this.dataModel,
      });
    },
  },
  computed: {
    allDataModel() {
      let data = this.$store.getters["app/getAllDataModel"];
      var totalSelectFemale = 0;
      var totalSelectmale = 0;
      var totalfullcount = 0;
      if (data) {
        this.dataModel.forEach((element) => {
          //let dataValue = element;
          if (data[this.selectorData.dataModelName]) {
            console.log(
              "element",
              element,
              data[this.selectorData.dataModelName].data
            );
            let newfilter = data[this.selectorData.dataModelName].data.filter(
              (el) => {
                return el["value"] == element;
              }
            );
            console.log("newfilter", newfilter);
            totalSelectFemale += newfilter[0].femaleCount;
            totalSelectmale += newfilter[0].maleCount;
            totalfullcount = newfilter[0].totalFullCount;
          }

          //   if (data[this.selectorData.dataModelName]) {
          //     let newArray = data[this.selectorData.dataModelName].filter(
          //       (el) => {
          //         return el["value"] == dataValue;
          //       }
          //     );
          //     console.log("newArray", newArray);
          //   }

          //   let newArray = data.filter((el) => {
          //     return el[datahasSpecific] !== undefined;
          //   });
          //   console.log("HasSpecificDisease", newArray[0][datahasSpecific]);
          //   totalHasSpecificDisease += newArray[0][datahasSpecific];
        }); //end of HasSpecificDisease

        console.log("total selectmale", totalSelectmale);
        console.log(" totalSelectFemale", totalSelectFemale);
        console.log("total sum", totalSelectmale +totalSelectFemale);

        this.malePercent =
        Math.round(((totalSelectmale * 100) / totalfullcount) * 100) / 100;

        this.femalePercent =
        Math.round(((totalSelectFemale * 100) / totalfullcount) * 100) / 100;
      }
      return data;
      //return this.$store.getters["app/getAllDataModel"];
    },
    calculatePercent() {
      console.log("taghiir");
    },
  },
};
</script>

<style>
</style>