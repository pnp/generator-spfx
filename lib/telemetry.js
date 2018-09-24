const appInsights = require("applicationinsights");
const appInsightID = "e4a6a175-b2f5-4a8b-9218-caae15d66198";

const config = appInsights.setup(appInsightID)
const client = appInsights.defaultClient;

config.setInternalLogging(false, false)
    .setAutoDependencyCorrelation(false)
    .setAutoCollectRequests(false)
    .setAutoCollectPerformance(false)
    .setAutoCollectExceptions(false)
    .setAutoCollectDependencies(false)
    .setAutoCollectConsole(false)
    .setUseDiskRetryCaching(false)

module.exports = {

    trackReRun: (data) => {

        delete appInsights.defaultClient.context.tags['ai.cloud.roleInstance'];
        delete appInsights.defaultClient.context.tags['ai.cloud.role'];

        client.trackEvent({
            name: 'Component',
            properties: {
                framework: data
            }
        });
        client.flush();

    },
    trackEvent: (data) => {

        delete appInsights.defaultClient.context.tags['ai.cloud.roleInstance'];
        delete appInsights.defaultClient.context.tags['ai.cloud.role'];

        client.trackEvent({
            name: 'Scaffold',
            properties: data
        });
        client.flush();

    }

}
