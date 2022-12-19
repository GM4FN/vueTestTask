<template>
  <div>
    <b-table
      hover
      :items="items"
      :fields="fields"
      label-sort-asc=""
      label-sort-desc=""
      label-sort-clear="">
      <template #thead-top>
        <button
          class="btn btn-light"
          type="button"
          @click="sortByDefault"
          value="toDefault">
          По умолчанию
        </button>
      </template>
      <template #head(name)="fields">
        <button
          class="btn btn-light"
          type="button"
          @click="sortByName"
          value="nameIncrease">
          {{ fields.label }}
          <arrows-sort
            :arrow-down="arrows.down.name"
            :arrow-up="arrows.up.name" />
        </button>
      </template>
      <template #head(gender)="fields">
        <button
          class="btn btn-light"
          type="button"
          @click="sortByGender"
          value="genderIncrease">
          {{ fields.label }}
          <arrows-sort
            :arrow-down="arrows.down.gender"
            :arrow-up="arrows.up.gender" />
        </button>
      </template>
      <template #head(age)="fields">
        <button
          class="btn btn-light"
          type="button"
          @click="sortByAge"
          value="ageIncrease">
          {{ fields.label }}
          <arrows-sort
            :arrow-down="arrows.down.age"
            :arrow-up="arrows.up.age" />
        </button>
      </template>
      <template #head(phone)="fields">
        <button
          class="btn btn-light"
          type="button"
          @click="sortByPhone"
          value="phoneIncrease">
          {{ fields.label }}
          <arrows-sort
            :arrow-down="arrows.down.phone"
            :arrow-up="arrows.up.phone" />
        </button>
      </template>

      <template #cell(name)="items"> {{ items.item.levelChild }}{{ items.item.name }} </template>
      <template #cell(gender)="items">
        {{ items.item.gender }}
      </template>
      <template #cell(age)="items">
        {{ items.item.age }}
      </template>
      <template #cell(phone)="items">
        {{ items.item.phone }}
      </template>
    </b-table>
  </div>
</template>

<script>
import arrowsSort from "./ArrowsSort.vue";

export default {
  name: "employee-table",
  components: {
    arrowsSort,
  },
  data() {
    return {
      fields: [
        { key: "name", label: "Имя" },
        { key: "gender", label: "Пол" },
        { key: "age", label: "Возраст" },
        { key: "phone", label: "Телефон" },
      ],
      sort: "",
      items: this.$store.state.employeesData,
      arrows: {
        down: {
          name: false,
          gender: false,
          age: false,
          phone: false,
        },
        up: {
          name: true,
          gender: true,
          age: true,
          phone: true,
        },
      },
    };
  },
  computed: {},
  methods: {
    sortByName(event) {
      const buttonValue = event.target.value;
      if (buttonValue === "nameIncrease") {
        this.items = this.$store.getters.sortByName([1, -1]);
        this.arrows.up.name = false;
        this.arrows.down.name = true;
        event.target.value = "nameDecrease";
      } else if (buttonValue === "nameDecrease") {
        this.items = this.$store.getters.sortByName([-1, 1]);
        this.arrows.up.name = true;
        this.arrows.down.name = false;
        event.target.value = "nameIncrease";
      }
    },
    sortByGender(event) {
      const buttonValue = event.target.value;
      if (buttonValue === "genderIncrease") {
        this.items = this.$store.getters.sortByGender([1, -1]);
        this.arrows.up.gender = false;
        this.arrows.down.gender = true;
        event.target.value = "genderDecrease";
      } else if (buttonValue === "genderDecrease") {
        this.items = this.$store.getters.sortByGender([-1, 1]);
        this.arrows.up.gender = true;
        this.arrows.down.gender = false;
        event.target.value = "genderIncrease";
      }
    },
    sortByAge(event) {
      const buttonValue = event.target.value;
      if (buttonValue === "ageIncrease") {
        this.items = this.$store.getters.sortByAgeOrPhone([1, -1], "age");
        this.arrows.up.age = true;
        this.arrows.down.age = false;
        event.target.value = "ageDecrease";
      } else if (buttonValue === "ageDecrease") {
        this.items = this.$store.getters.sortByAgeOrPhone([-1, 1], "age");
        this.arrows.up.age = false;
        this.arrows.down.age = true;
        event.target.value = "ageIncrease";
      }
    },
    sortByPhone(event) {
      const buttonValue = event.target.value;
      if (buttonValue === "phoneIncrease") {
        this.items = this.$store.getters.sortByAgeOrPhone([1, -1], "phone");
        this.arrows.up.phone = true;
        this.arrows.down.phone = false;
        event.target.value = "phoneDecrease";
      } else if (buttonValue === "phoneDecrease") {
        this.items = this.$store.getters.sortByAgeOrPhone([-1, 1], "phone");
        this.arrows.up.phone = false;
        this.arrows.down.phone = true;
        event.target.value = "phoneIncrease";
      }
    },
    sortByDefault() {
      this.items = this.$store.state.employeesData;
      for (const key in this.arrows.down) {
        this.arrows.down[key] = false;
      }
      for (const key in this.arrows.up) {
        this.arrows.up[key] = true;
      }
    },
  },
};
</script>

<style lang="sass" scoped></style>
