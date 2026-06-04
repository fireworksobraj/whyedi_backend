const { createStrapi } = require('@strapi/strapi');

async function seed() {
    const app = await createStrapi().load();
    const states = [
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
        { stateName: 'Washington', stateCode: 'WA', licenseNumber: '(MLO-216981)', svgFile: 'outline-wa.svg', company: 'EYWA', publishedAt: new Date() }
    ];

    for (const state of states) {
        await app.db.query('api::state-license.state-license').create({ data: state });
        console.log(`Added ${state.stateName}`);
    }
    
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
