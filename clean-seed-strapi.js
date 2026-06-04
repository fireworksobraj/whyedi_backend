const { createStrapi } = require('@strapi/strapi');

async function cleanAndSeed() {
    const app = await createStrapi().load();
    
    // 1. Delete all existing states to remove duplicates
    const allStates = await app.db.query('api::state-license.state-license').findMany();
    for (const state of allStates) {
        await app.db.query('api::state-license.state-license').delete({ where: { id: state.id } });
    }
    console.log(`Deleted ${allStates.length} existing states to clear duplicates.`);

    // 2. Insert the correct 14 states for EYWA + 1 for ZAPA
    const statesToInsert = [
        // EYWA
        { stateName: 'Alabama', stateCode: 'AL', licenseNumber: '', svgFile: 'outline-al.svg', company: 'EYWA', publishedAt: new Date() },
        { stateName: 'Arizona', stateCode: 'AZ', licenseNumber: '(LO-2010950)', svgFile: 'outline-az.svg', company: 'EYWA', publishedAt: new Date() },
        { stateName: 'California', stateCode: 'CA', licenseNumber: '(DFPI216981)', svgFile: 'outline-ca.svg', company: 'EYWA', publishedAt: new Date() },
        { stateName: 'Colorado', stateCode: 'CO', licenseNumber: '', svgFile: 'outline-co.svg', company: 'EYWA', publishedAt: new Date() },
        { stateName: 'Connecticut', stateCode: 'CT', licenseNumber: '', svgFile: 'outline-ct.svg', company: 'EYWA', publishedAt: new Date() },
        { stateName: 'Florida', stateCode: 'FL', licenseNumber: '(LO140551)', svgFile: 'outline-fl.svg', company: 'EYWA', publishedAt: new Date() },
        { stateName: 'Louisiana', stateCode: 'LA', licenseNumber: '', svgFile: 'outline-la.svg', company: 'EYWA', publishedAt: new Date() },
        { stateName: 'Missouri', stateCode: 'MO', licenseNumber: '', svgFile: 'outline-mo.svg', company: 'EYWA', publishedAt: new Date() },
        { stateName: 'Oregon', stateCode: 'OR', licenseNumber: '', svgFile: 'outline-or.svg', company: 'EYWA', publishedAt: new Date() },
        { stateName: 'Pennsylvania', stateCode: 'PA', licenseNumber: '', svgFile: 'outline-pa.svg', company: 'EYWA', publishedAt: new Date() },
        { stateName: 'Tennessee', stateCode: 'TN', licenseNumber: '', svgFile: 'outline-tn.svg', company: 'EYWA', publishedAt: new Date() },
        { stateName: 'Texas', stateCode: 'TX', licenseNumber: '(Dual Attachment)', svgFile: 'outline-tx.svg', company: 'EYWA', publishedAt: new Date() },
        { stateName: 'Virginia', stateCode: 'VA', licenseNumber: '', svgFile: 'outline-va.svg', company: 'EYWA', publishedAt: new Date() },
        { stateName: 'Washington', stateCode: 'WA', licenseNumber: '(MLO-216981)', svgFile: 'outline-wa.svg', company: 'EYWA', publishedAt: new Date() },
        
        // ZAPA
        { stateName: 'Texas', stateCode: 'TX', licenseNumber: '(Dual Attachment)', svgFile: 'outline-tx.svg', company: 'ZAPA', publishedAt: new Date() }
    ];

    for (const state of statesToInsert) {
        await app.db.query('api::state-license.state-license').create({ data: state });
        console.log(`Added fresh state: ${state.stateName} for ${state.company}`);
    }
    
    process.exit(0);
}

cleanAndSeed().catch(err => {
    console.error(err);
    process.exit(1);
});
