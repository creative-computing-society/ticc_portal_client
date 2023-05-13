const Guidlines: React.FC = () => {
  return (
    <div className="mb-12 p-4 rounded-lg bg-orange-400 bg-opacity-20">
      <h3 className="text-xl font-medium mb-2">Some Important Guidelines:</h3>
      <ul className="list-disc list-outside ml-4 flex flex-col gap-2">
        <li>
          It is advised to book an empty slot to ensure you are timely
          entertained.
        </li>
        <li>
          Each slot can be booked by 2 people and the second person would be
          attended to subject to availability, that is, if the first person
          fails to show up or gets free before next slot.
        </li>
        <li>
          Your appointment will be cancelled if you do not arrive or call within
          10 minutes of your scheduled appointment time.
        </li>
        <li>
          WhatsApp is only to be used for slot booking. Please don't send any
          further messages via WhatsApp. Aside from identity proof, forms, and
          medical prescriptions as requested by your counsellor.
        </li>
        <li>
          The only way to register for a personal counselling session is to use
          your TIET email account.
        </li>
        <li>
          For your first session of personal counselling, it is requisite to
          fill out the informed consent form. Your counsellor will provide you
          with the form.
        </li>
      </ul>
    </div>
  );
};

export default Guidlines;
