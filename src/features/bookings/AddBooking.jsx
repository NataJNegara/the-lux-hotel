import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBookingForm from "./CreateBookingForm";

export default function AddBooking() {
  return (
    <Modal>
      <Modal.Open opens="add-booking">
        <Button>Add Booking</Button>
      </Modal.Open>
      <Modal.Window name="add-booking">
        <CreateBookingForm />
      </Modal.Window>
    </Modal>
  );
}
