# Feature overview

The official SPFx generator targets for three specific platforms:

* SharePoint Online
* SharePoint Online and SharePoint 2019
* SharePoint Online, SharePoint 2019, SharePoint 2016

Not all those options generate the same version of SPFx projects and the available features are limited to the lowest supported version.

![Target framework seletion](./assets/framework-selection-options.png)

Depending on the selections mad different options can be supported by the SharePoint Framework.

## SharePoint Online

This options create a project based on the latest SPFx version 1.7.1

### Addons

| | jQuery | pnp/pnpjs | PnP Property Controls | PnP Reusable Controls |
|:-----|:-----:|:-----:|:-----:|:-----:|
| ReactJS|✅|✅|✅|✅|
| KnockoutJS|✅|✅|✅| 
| No Framework|✅|✅|✅| 
| VueJS|✅|✅|✅| 
| HandlebarsJS|✅|✅|✅| 
| Angular Elements|✅|✅|✅|

### Vetting Options

| | WebPack Bundle Analyzer | StyleLint 
|:-----|:-----:|:-----:|
|ReactJS|✅|✅|
|KnockoutJS|✅|✅|
|No Framework|✅|✅|
|VueJS|✅| 
|HandlebarsJS|✅|✅|
|Angular Elements|✅|✅|

### Test Framework

| |**Jest**|
|:-----|:-----:|
| ReactJS |✅|
| KnockoutJS| | 
| No Framework|✅|
| VueJS| |
| HandlebarsJS| |
| Angular Elements| |


## SharePoint Online and SharePoint 2019

This option creates a project based on SPFx version 1.4.0

### Addons

| | jQuery | pnp/pnpjs | PnP Property Controls | PnP Reusable Controls |
|:-----|:-----:|:-----:|:-----:|:-----:|
| ReactJS|✅|✅|✅|✅|
| KnockoutJS|✅|✅|✅| 
| No Framework|✅|✅|✅| 
| VueJS|✅|✅|✅| 
| HandlebarsJS|✅|✅|✅| 
| Angular Elements|✅|✅|✅|

### Vetting Options

| | WebPack Bundle Analyzer | StyleLint 
|:-----|:-----:|:-----:|
|ReactJS|✅|✅|
|KnockoutJS|✅|✅|
|No Framework|✅|✅|
|VueJS|✅| 
|HandlebarsJS|✅|✅|
|Angular Elements|✅|✅|

### Test Framework

| |**Jest**|
|:-----|:-----:|
| ReactJS |✅|
| KnockoutJS| | 
| No Framework|✅|
| VueJS| |
| HandlebarsJS| |
| Angular Elements| |

**SharePoint Online, SharePoint 2019, SharePoint 2016**

This option creates a project based on SPFx version 1.1.0. This old version makes avoid to securly use the following frameworks:

* VueJS
* HandlebarsJS
* Angular Elements

### Addons

| | jQuery | pnp/pnpjs | PnP Property Controls | PnP Reusable Controls |
|:-----|:-----:|:-----:|:-----:|:-----:|
| ReactJS|✅|✅| | |
| KnockoutJS|✅|✅| | 
| No Framework|✅|✅| | 


### Vetting Options

| | WebPack Bundle Analyzer | StyleLint 
|:-----|:-----:|:-----:|
|ReactJS|✅|✅|
|KnockoutJS|✅|✅|
|No Framework|✅|✅|

### Test Framework

| |**Jest**|
|:-----|:-----:|
| ReactJS |✅|
| KnockoutJS| | 
| No Framework|✅|
