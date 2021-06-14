<template>
  <v-row>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <label @click="selectAll" v-on="on" for="">{{ selectorData.title }} :</label>
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
  </v-row>
</template>

<script>
export default {
  name: "SelectorComponent",
  props: ["selectorData"],
  data() {
    return {
      dataModel: [],
    };
  },
  methods: {
    over(val) {
      this.$emit("over", {dataModelName :this.selectorData.dataModelName,value:val});
    },
    selectAll() {
        this.dataModel= [];
        this.selectorData.values.forEach(element => {
            this.dataModel.push(element);
        });
        this.$emit("over",{dataModelName :this.selectorData.dataModelName,value:this.dataModel} );
    },
  },
};
</script>

<style>
</style>