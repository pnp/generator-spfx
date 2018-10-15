module.exports = {

    trackEvent: (source, data) => {

        const appInsights = require("applicationinsights");
        const appInsightID = "a8ff7bfb-caa5-4a60-ac06-705eb0682514";

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

        if (data !== undefined && data.testrun !== undefined && data.testrun === true) {
            return;
        }

        delete appInsights.defaultClient.context.tags['ai.cloud.roleInstance'];
        delete appInsights.defaultClient.context.tags['ai.cloud.role'];

        client.trackEvent({
            name: source,
            properties: data
        });
        client.flush();

    }

}
