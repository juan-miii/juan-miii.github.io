<!--
Basic workflow explanation for labels and version updates.
###############################################################################
- The labeler automatically applies labels based on file changes.
- It assigns one or more labels.
###############################################################################
- The applied labels control the version bump when the PR is merged.
  - `bump-patch` | `bump-minor` | `bump-major`: Increments the version 
  (e.g., `v1.0.0` -> `v1.0.1`).
  - Else, no version bump will be performed.
- There are classical labels too.
###############################################################################
Please ensure the correct labels are applied before merging to avoid any 
issues with version bumps.
-->
