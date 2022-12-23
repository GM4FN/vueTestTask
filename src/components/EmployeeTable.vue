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
          @click="sort($event, 'name', 'Name')"
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
          @click="sort($event, 'gender', 'Gender')"
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
          @click="sort($event, 'age', 'Age')"
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
          @click="sort($event, 'phone', 'Phone')"
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
import sorting from "../services/sort";
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
      items: this.$store.state.employeesData,
      directionByIncrease: [1, -1],
      directionByDecrease: [-1, 1],
    };
  },
  methods: {
    sort(event, title, titleForSorting) {
      const buttonValue = event.target.value;
      if (buttonValue === title + "Increase") {
        this.items = sorting["sort" + titleForSorting](this.$store.state, this.directionByIncrease);
        this.arrows.up[title] = false;
        this.arrows.down[title] = true;
        event.target.value = title + "Decrease";
      } else if (buttonValue === title + "Decrease") {
        this.items = sorting["sort" + titleForSorting](this.$store.state, this.directionByDecrease);
        this.arrows.up[title] = true;
        this.arrows.down[title] = false;
        event.target.value = title + "Increase";
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
