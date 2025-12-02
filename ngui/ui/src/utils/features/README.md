# Features

In this directory you can find *feature flag* related utils

## Theme Features

Theme features are created to be able to control some of the features per theme. They take precedence over the API Organization Features (look here: ngui/ui/src/hooks/useIsFeatureEnabled.ts) 

All the flags are kept in *ngui/ui/src/theme.feature.ts* file to keep this configuration as close as possible to theme. We keep snake_case naming convention to follow naming conventions used by feature flags API.

Flag can have tree values: 
true - permanently enable
false - permanently disabled
undefined - respect API organization flag

### Examples

#### Example 1. paid_organization

We do not want to have any feaures to be demo features or disabled if someone does not pay for the platform. We control access to the platform so all features are enabled by default. 

This is why we set the flag __paid_organization__ in *ngui/ui/src/theme.feature.ts* to permanently enable it in the whole platform where useIsPaidOrganization hook is used.

```
const isPaidOrganization = useIsPaidOrganization();
```

#### Example 2. Hide product tour

We want to hide product tour for all users

```
const isProductTourEnabled = useIsFeatureEnabled("product_tour");

...

{isProductTourEnabled && organizationId && (
    <IconButton
    dataTestId="btn_product_tour"
    color="info"
    icon={<LiveHelpOutlinedIcon />}
    onClick={startProductTour}
    disabled={!isProductTourAvailable || !isTourAvailableForCurrentBreakpoint}
    tooltip={{
        show: true,
        value: <FormattedMessage id="productTour" />
    }}
    />
)}

```

## Next steps

We can introduce another level of Feature Flags (environment variable, runtime controled flags)

## Notes

This feature is important for themification.