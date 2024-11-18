const Confirmation = ({delete_pole, cancel_delete}: {delete_pole:()=> void, cancel_delete: ()=> void}) => {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80 z-100">
                    <p className="text-center mb-4">Are you sure you want to delete this poll?</p>
                    <div className="flex justify-around">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={delete_pole} // Confirm deletion
                        >
                            Delete
                        </button>
                        <button
                            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                            onClick={cancel_delete} // Cancel deletion
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Confirmation