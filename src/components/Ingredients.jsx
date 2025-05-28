export default function Ingredients({ ingredients }) {
  return (
    <section className="h-auto w-full space-y-6 ">
      <h2 className="text-2xl font-semibold">Ingredients</h2>
      <ul className="list-disc list-inside text-lg space-y-2">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </section>
  );
}
