<template>
  <div class="hello">
    <span>Pls put URL</span>
    <input v-model="longUrl" type="text">
    <button
      style="margin:0 0 30px 0"
      v-on:click="post()"
    >
      Shorten Url
    </button>
    <hr>
      <div
        id="row"
        v-for="url in urlList"
        :key="url.id"
        align="start"
      >
          <p>
            ID: {{ url._id }}
          </p>
          <p>
            Long url: <a v-bind:href="url.longUrl"> {{ url.longUrl.length > 70 ? url.longUrl.slice(0,70) + '...' : url.longUrl }}</a>
          </p>
          <p>
            Short url: <a v-bind:href="url.shortUrl"> {{ url.shortUrl }}</a>
          </p>
          <p>
            Click count: {{ url.clickCount }}
          </p>
          <button
            v-on:click="deleteUrl(url)"
          >
            Delete Url
          </button>
          <hr>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      url: 'j5A3LuS7n',
      longUrl: '',
      urlList: []
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    async post () {
      try {
        const { data } = await axios.post('http://localhost:8000/v1/shorturl/', {
          longUrl: this.longUrl
        })
        if (data) {
          alert('Wohoo')
          location.reload()
        }
      } catch (err) {
        console.log(err)
      }
    },
    async get () {
      try {
        const { data } = await axios.get(`http://localhost:8000/all`)
        if (data) {
          this.urlList = data
        }
      } catch (err) {
        console.log(err)
      }
    },
    async deleteUrl (url) {
      try {
        const { data } = await axios.post(`http://localhost:8000/delete`, {
          shortUrl: url.shortUrl
        })
        if (data) {
          console.log('Wohooo')
          location.reload()
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#row {
  margin-bottom: 20px;
  padding: 0 0 0 10px;
}
</style>
