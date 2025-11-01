## Technologies

- **React 19**
- **TypeScript**
- **React DnD**
- **Recharts**

## Requirements

- **Node.js** version 18 or higher
- **npm** or **yarn** or **pnpm**

## Installation

1. Clone the repository or navigate to the project directory:
```bash
cd YouScan
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the dev server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (port may vary).

## Usage

### Main Features

1. **Adding Blocks:**
   - Select a block type from the dropdown list (Line Chart, Bar Chart, Text Block)
   - Click the "Add Block" button
   - A new block will appear on the dashboard in the first available position
   - In accordance with the requirements (**Fixed width: 3 columns**), when adding the 4th, 7th, 10th, etc. element, empty cells are automatically created in the same row (if there is at least one filled block in the row, all 3 cells of this row will be displayed, including empty ones)

2. **Moving Blocks:**
   - Hover over a block and drag it to the desired position
   - **Visual feedback during drag:**
     - The dragged block becomes semi-transparent while being dragged
     - Empty cells show a green dashed border when you hover over them (valid drop target)
     - Occupied cells show a red dashed border when you hover over them (invalid drop target)
   - **Drop restrictions:**
     - You cannot drop a block on an occupied cell
     - Dropping a block on its current position has no effect (prevents unnecessary updates)

3. **Removing Blocks:**
   - Hover over a block to reveal the delete button (×) in the top right corner
   - Click the "×" button to remove the block from the dashboard

4. **Empty Dashboard State:**
   - When the dashboard has no blocks, an empty state message is displayed: "Dashboard is empty - Start building your dashboard by adding your first block"

### Available Block Types

- **Line Chart** - line chart with mock data
- **Bar Chart** - bar chart with mock data
- **Text Block** - text block with title and content
  - Long text content is automatically truncated with ellipsis (...) if it doesn't fit within the block's height
  - The maximum number of visible lines is dynamically calculated based on the available space (considering the title height and block padding)
  - Text truncation adapts automatically when the block is resized (using ResizeObserver and window resize events)

### Grid Structure

- Dashboard uses a **3-column** grid (Fixed width: 3 columns according to requirements)
- Blocks are automatically placed in the first available position (searched from top-left to bottom-right)
- Blocks can be dragged between grid cells
- If there is at least one filled block in a row, all 3 cells of that row are displayed (1 filled + 2 empty). This means that when adding the 4th, 7th, 10th, etc. element, empty cells automatically appear in the corresponding rows to maintain the 3-column grid structure
- Grid cells have a square aspect ratio (1:1) for consistent visual appearance

## Design Decisions

### Block Positioning and Removal

When a block is **deleted**, the remaining blocks **do not automatically shift** to fill the empty space. This behavior is **intentional** and follows these design principles:

1. **User Intent Preservation** - Users may have deliberately positioned blocks in specific locations. Automatic repositioning could be unexpected and frustrating
2. **Predictable Behavior** - Each block maintains its position unless explicitly moved by the user via drag & drop
3. **Grid Stability** - The grid layout remains stable, preventing layout shifts that could disorient users

If a user wants to reorganize blocks after deletion, they can manually drag blocks to desired positions.

### Responsive Layout

The application does not provide a responsive layout for mobile devices, in accordance with the requirements in the specification, which state "No need to support responsive layout". The interface is optimized for desktop viewing.

### Visual Design

Since the requirements specified **"visual design is flexible"**, the blocks have been designed according to personal preference.

## Error Handling

- **Error Boundary** at the App level intercepts critical errors
- Each block is **not wrapped** in a separate Error Boundary for the following reasons:

1. **Architecture Simplification** - for a test assignment, I think this would be excessive error isolation
2. **Component Reusability** - blocks are rendered through a unified strategy (`blockRenderStrategies`)
3. **Sufficient Protection** - Error Boundary at the App level intercepts critical errors
4. **Performance** - avoiding unnecessary React wrapper components for each block reduces rendering overhead

## No Limits on Block Count

In accordance with the **Unlimited vertical height** requirement, the number of blocks is **not limited**:

- Grid expands vertically as blocks are added
- No artificial limits like "maximum N blocks"

## Virtualization for Large Lists

Virtualization (e.g., via `react-window` or `react-virtualized`) is **not implemented** for the following reasons:

1. **Implementation Complexity** - proper drag & drop functionality with a virtualized list requires additional logic to calculate positions when dragging elements outside the visible area
2. **Performance is Sufficient** - React efficiently handles rendering hundreds of elements, which is sufficient for the test scenario
3. **Not Specified in Requirements** - virtualization was not mentioned in the requirements, so it was decided to focus on core functionality
