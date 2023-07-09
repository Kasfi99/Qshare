<script>
import Table from '../components/Table.vue';
import Card from '../components/Card.vue';
import Footer from '../components/Footer.vue';
export default {
    components: {
        Table,
        Card,
        Footer
    }
}
</script>

<template>
    <div class="flex">
        <div style="position: sticky; top: 0; margin-left: 40px; margin-right: -300px; margin-top: 30px;">
            <Card />
        </div>
        <div style="width: 65%; margin: auto; margin-top: 20px; height: 100vh; overflow: auto; margin-bottom: 40px;">
            <Table />
        </div>
    </div>
    <Footer style="width: 65%; margin: auto; margin-bottom: 60px;" />
</template>
