<template>
  <section class="worker-form flex-column position-absolute justify-content-center">
    <form
      action=""
      class="worker-form-modal d-flex flex-column align-self-center"
      @submit.prevent="">
      <button
        type="button"
        class="btn-close align-self-end justify-center mb-1"
        @click="hideForm"></button>
      <div class="align-self-center mb-2">Добавить сотрудника</div>
      <div class="input-group mb-3">
        <span
          class="input-group-text d-inline-block"
          id="basic-addon1"
          >Имя</span
        >
        <input
          type="text"
          class="form-control"
          placeholder="Как зовут"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="name"
          required />
      </div>
      <div class="input-group mb-3">
        <span
          class="input-group-text d-inline-block"
          id="basic-addon1"
          >Пол</span
        >
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="gender"
          required>
          <option
            disabled
            selected>
            Выберите ваш пол
          </option>
          <option value="Женский">Женский</option>
          <option value="Мужсой">Мужской</option>
          <option value="Неизвестно">Оно</option>
        </select>
      </div>
      <div class="input-group mb-3">
        <span
          class="input-group-text d-inline-block"
          id="basic-addon1"
          >Возраст</span
        >
        <input
          type="text"
          class="form-control"
          placeholder="Сколько лет"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="age"
          required />
      </div>
      <div class="input-group mb-3">
        <span
          class="input-group-text d-inline-block"
          id="basic-addon1"
          >Телефон</span
        >
        <input
          type="text"
          class="form-control"
          placeholder="Номер телефона"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="phone"
          required />
      </div>
      <div class="input-group mb-3">
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="chief">
          <option
            disabled
            selected>
            Выберите ваше руководителя(лучше не надо*__* )
          </option>
          <option
            :value="chief"
            v-for="chief in this.$store.state.maybeChief">
            {{ chief }}
          </option>
        </select>
      </div>
      <button
        class="btn btn-primary align-self-center"
        @click="pushDataArr">
        Заполнить
      </button>
    </form>
  </section>
</template>
<!-- 1 Имя(буквы валид) !!обязательно
    2 Пол !!обязательно
    3 Возраст(>18 валид) !!обязательно
    4 Номер тлф !!обязательно
    5 select(кто наставник) -->
<script>
export default {
  data() {
    return {};
  },
  computed: {
    name: {
      get() {
        return this.$store.state.workerFormRaw.name;
      },
      set(value) {
        this.$store.commit("pushWorkerRaw", { name: "name", value });
      },
    },
    gender: {
      get() {
        return this.$store.state.workerFormRaw.gender;
      },
      set(value) {
        this.$store.commit("pushWorkerRaw", { name: "gender", value });
      },
    },
    age: {
      get() {
        return this.$store.state.workerFormRaw.age;
      },
      set(value) {
        this.$store.commit("pushWorkerRaw", { name: "age", value });
      },
    },
    phone: {
      get() {
        return this.$store.state.workerFormRaw.phone;
      },
      set(value) {
        this.$store.commit("pushWorkerRaw", { name: "phone", value });
      },
    },
    chief: {
      get() {
        return this.$store.state.workerFormRaw.chief;
      },
      set(value) {
        this.$store.commit("pushWorkerRaw", { name: "chief", value });
      },
    },
  },
  methods: {
    hideForm() {
      this.$store.commit("hideWorkerForm");
    },
    pushDataArr() {
      // this.$store.dispatch("pushArr");
      this.$store.commit("pushWorkerArr");
    },
  },
  name: "worker-form",
};
</script>

<style lang="sass" scoped>
.worker-form
  display: flex
  width: 75vw
  height: 100vh
  background-color: rgba(200, 200, 200, 0.8 )
  &-modal
    padding: 5px 15px
    width: 80%
    border: 2px solid rgba(150, 150, 150, 1 )
    border-radius: 10px
    background-color: white
.input-group
  span
    width: 25%
</style>
