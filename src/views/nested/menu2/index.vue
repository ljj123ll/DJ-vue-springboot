<!-- <template>
  <div class="components-container board">
    <Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="昨日会议" />
    <Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="今日会议" />
    <Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="明日会议" />
  </div>
</template>
<script>
import Kanban from '@/components/Kanban'

export default {
  name: 'DragKanbanDemo',
  components: {
    Kanban
  },
  data() {
    return {
      group: 'mission',
      list1: [
        { name: '听取和审查党支部委员会的工作报告', id: 1 },
        { name: '按照规定开展党支部选举工作', id: 2 },
        { name: '讨论决定对党员的表彰表扬', id: 3 },
        { name: '党员大会', id: 4 }
      ],
      list2: [
        { name: '党小组会', id: 5 },
        { name: '党课', id: 6 },
        { name: '党支部委员会会议', id: 7 }
      ],
      list3: [
        { name: '党支部党员大会', id: 8 },
        { name: '人民生活保障讨论', id: 9 },
        { name: '人民生活保障讨论', id: 10 }
      ]
    }
  }
}

</script>

<style lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>
 -->

<template>
  <div class="components-container board">
    <Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="昨日会议" />
    <Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="今日会议" />
    <Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="明日会议" />
  </div>
</template>

<script>
import Kanban from '@/components/Kanban'
import axios from 'axios' // 导入 Axios 库

export default {
  name: 'DragKanbanDemo',
  components: {
    Kanban
  },
  data() {
    return {
      group: 'mission',
      list1: [],
      list2: [],
      list3: []
    }
  },
  created() {
    this.fetchData() // 在页面加载时调用 fetchData 方法获取数据
  },
  methods: {
    fetchData() {
      axios.get('/api/tasks') // 发送 GET 请求获取任务数据
        .then(response => {
          const data = response.data
          this.list1 = data.filter(task => task.group === 'todo') // 将数据根据分组赋值给对应的列表
          this.list2 = data.filter(task => task.group === 'working')
          this.list3 = data.filter(task => task.group === 'done')
        })
        .catch(error => {
          console.error('Error fetching data:', error)
        })
    }
  }
}
</script>

<style lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>
