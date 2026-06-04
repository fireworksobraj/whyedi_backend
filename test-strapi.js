const { createStrapi } = require('@strapi/strapi');

async function test() {
    const app = await createStrapi().load();
    const all = await app.db.query('api::state-license.state-license').findMany();
    console.log(`Total states: ${all.length}`);

    const eywa = await app.db.query('api::state-license.state-license').findMany({ where: { company: 'EYWA' } });
    console.log(`EYWA states: ${eywa.length}`);

    const zapa = await app.db.query('api::state-license.state-license').findMany({ where: { company: 'ZAPA' } });
    console.log(`ZAPA states: ${zapa.length}`);

    process.exit(0);
}

test().catch(err => {
    console.error(err);
    process.exit(1);
});
