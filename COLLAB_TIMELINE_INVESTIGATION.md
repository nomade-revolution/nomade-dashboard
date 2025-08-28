# Collab Timeline Investigation Report

## Executive Summary

The "Estados" (Status) timeline in the Collab detail screen is incorrectly showing all steps as completed. This issue was introduced when the old Material-UI Stepper component was replaced with a custom timeline component (`CollabsStateTimelineV2`) in February 2025. The root cause is a fundamental change in how step completion is determined.

## Problem Description

**Current Behavior**: All timeline steps appear with green checkmarks and completed styling, regardless of the actual collab progress.

**Expected Behavior**: Only steps up to the current collab state should appear completed; future steps should appear as pending (gray circles).

## Root Cause Analysis

### 1. Completion Logic Change

**Previous Logic (Working)**:

```typescript
// Old ReusableStepper component
<Stepper activeStep={collab.state.id} orientation="vertical">
  {steps?.map((step) => (
    <Step key={step.id} active={collab.state.id === step.id}>
      // Only steps <= current state were marked as completed
    </Step>
  ))}
</Stepper>
```

**Current Logic (Broken)**:

```typescript
// New CollabsStateTimelineV2 component
const isCompleted = step.created_at; // ❌ Any timestamp = completed

if (isCompleted) {
  return { ...styles.circle, ...styles.circleCompleted };
}
```

### 2. Backend Data Change

The backend API (`GET /colabs/{id}`) now returns `created_at` timestamps for ALL steps in the history array, including future steps that haven't been reached yet. This makes the "timestamp exists" completion rule obsolete.

## Data Flow Analysis

```
1. API Call: GET /colabs/{id}
   ↓
2. Repository: CollabsRepository.getCollab()
   ↓
3. Service: CollabsService.getCollabById()
   ↓
4. Context: CollabsContext.getCollabById()
   ↓
5. Component: CollabDetailPage → ReusableStepper → CollabsStateTimelineV2
   ↓
6. Rendering: Each step checks step.created_at for completion
```

## Technical Details

### API Endpoint

- **URL**: `/colabs/{id}`
- **Method**: GET
- **Response**: `FullCollab` with `history: State[]` array

### Data Structure

```typescript
interface State {
  id: number; // Step ID (1-12)
  name: string; // Step name
  created_at: string; // Timestamp (now sent for ALL steps)
  type: string; // Actor type (Influencer, Company, Nomade)
  limit_date?: string; // Optional deadline
}
```

### Step IDs (from collabsStates.ts)

```typescript
COLAB_PENDING_NOMADE_STATE = 1; // Pendiente de aceptación (nomade)
COLAB_PENDING_COMPANY_STATE = 2; // Pendiente de aceptación (empresa)
COLAB_ACCEPTED_STATE = 3; // Aceptada
COLAB_MODIFICATION_IN_PROGRESS_STATE = 4; // Modificación en progreso
COLAB_SENT_STATE = 9; // Producto enviado/entregado
COLAB_RECEIVED_STATE = 10; // Producto recibido (todo ok)
COLAB_PUBLISHED_STATE = 12; // Contenido publicado
```

## Change History

| Commit    | Date         | Author      | Change                          | Impact                    |
| --------- | ------------ | ----------- | ------------------------------- | ------------------------- |
| `3f00899` | Feb 10, 2025 | Adrià       | New timeline component added    | ❌ Broke completion logic |
| `859d458` | Dec 12, 2024 | Adrian Arco | Fixed stepper for new interface | ✅ Working logic          |
| `ec781d4` | Earlier      | -           | Added publicated button         | -                         |

## Fix Options

### Option 1: Restore Previous Logic (Recommended)

```typescript
// Change completion rule from timestamp to state comparison
const isCompleted = step.id <= collab.state.id;
```

### Option 2: Hybrid Approach

```typescript
// Use timestamp for past steps, state ID for future steps
const isCompleted = step.created_at && step.id <= collab.state.id;
```

### Option 3: Explicit State Mapping

```typescript
// Define completion rules based on step IDs
const COMPLETION_RULES = {
  1: () => collab.state.id >= 1, // Pending nomade
  2: () => collab.state.id >= 2, // Pending company
  3: () => collab.state.id >= 3, // Accepted
  // ... etc
};
```

## Acceptance Criteria

- [ ] Only steps up to `collab.state.id` appear completed (green circles with checkmarks)
- [ ] Future steps appear as pending (gray circles)
- [ ] Current step is appropriately highlighted
- [ ] Error states (rejected, cancelled) maintain their special styling
- [ ] No regression in other timeline functionality

## Implementation Notes

1. **Backward Compatibility**: Ensure the fix works with both old and new API response formats
2. **Testing**: Test with collabs in various states to verify completion logic
3. **Performance**: The fix should not impact rendering performance
4. **Logging**: Keep the DEV-ONLY logging for future debugging

## Next Steps

1. ✅ **Investigation Complete**: Root cause identified
2. 🔄 **Fix Implementation**: Implement the chosen solution
3. 🧪 **Testing**: Verify fix works across different collab states
4. 📝 **Documentation**: Update component documentation
5. 🔍 **Monitoring**: Watch for similar issues in other timeline components

---

**Investigation Date**: January 28, 2025  
**Investigator**: AI Assistant  
**Status**: Root cause identified, ready for implementation
