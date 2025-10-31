import { useCallback, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DashboardGrid } from '../DashboardGrid'
import { useDashboardContext } from '@/modules/dashboard/hooks'
import { BLOCK_TYPES_LIST, type BlockType } from '@/modules/dashboard/model'
import './index.css'

export const Dashboard = () => {
  const { state, addBlock } = useDashboardContext()
  const [selectedType, setSelectedType] = useState<BlockType>(BLOCK_TYPES_LIST[0].type)

  const handleAddBlock = useCallback(() => {
    addBlock(selectedType)
  }, [addBlock, selectedType])

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedType(e.target.value as BlockType)
    },
    []
  )

  const isEmpty = state.blocks.length === 0

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="dashboard">
        <div className="dashboard-controls">
          <select
            className="dashboard-controls__select"
            value={selectedType}
            onChange={handleSelectChange}
          >
            {BLOCK_TYPES_LIST.map(({ type, label }) => (
              <option key={type} value={type}>
                {label}
              </option>
            ))}
          </select>
          <button onClick={handleAddBlock} className="dashboard-controls__button">
            Add Block
          </button>
        </div>
        {isEmpty ? (
          <div className="dashboard-empty">
            <div className="dashboard-empty__content">
              <h2 className="dashboard-empty__title">Dashboard is empty</h2>
              <p className="dashboard-empty__text">
                Start building your dashboard by adding your first block
              </p>
            </div>
          </div>
        ) : (
          <DashboardGrid blocks={state.blocks} gridColumns={state.gridColumns} />
        )}
      </div>
    </DndProvider>
  )
}
