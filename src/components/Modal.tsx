interface ModalProps {
    modalVisibility: boolean
    setModalVisibility: (visibility: boolean) => void
    resetInputValue?: () => void
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
    modalVisibility,
    setModalVisibility,
    children,
    resetInputValue
}) => {
    return (
        <dialog
            id='my_modal_3'
            className={`modal ${modalVisibility ? `modal-open` : ``}`}
        >
            <div className='modal-box'>
                <form method='dialog'>
                    <button
                        className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                        onClick={() => {
                            setModalVisibility(false)
                            if (resetInputValue) resetInputValue()
                        }}
                    >
                        ✕
                    </button>
                </form>
                {children}
            </div>
        </dialog>
    )
}

export default Modal
