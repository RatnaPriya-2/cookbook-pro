import { UtensilsCrossed, ChefHat, Target, Beef, Citrus, Flame, Sparkles, CookingPot, Utensils } from "lucide-react";

const ChefTips = () => {
  const tips = [
    {
      id: 1,
      title: "Mise en Place",
      desc: "Prepare all your ingredients before you start cooking. It prevents stress and ensures perfect timing.",
      icon: <UtensilsCrossed size={48} />,
    },
    {
      id: 2,
      title: "The Salt Secret",
      desc: "Season as you go, not just at the end. It layers flavors and makes the final dish taste more professional.",
      icon: <ChefHat size={48} />,
    },
    {
      id: 3,
      title: "Knife Skills",
      desc: "A sharp knife is a safe knife. Keep your blades honed to ensure precision and prevent accidents.",
      icon: <Target size={48} />,
    },
    {
      id: 4,
      title: "Rest Your Meat",
      desc: "Always let meat rest for 5-10 minutes after cooking. This distributes juices and keeps it tender.",
      icon: <Beef size={48} />,
    },
    {
      id: 5,
      title: "Acid Balance",
      desc: "If a dish feels 'missing something,' it's often acid. Add a squeeze of lemon or a drop of vinegar.",
      icon: <Citrus size={48} />,
    },
    {
      id: 6,
      title: "Hot Pan, Cold Oil",
      desc: "Wait for the pan to heat up before adding oil. This creates a non-stick surface and prevents burning.",
      icon: <Flame size={48} />,
    },
    {
      id: 7,
      title: "Toast Your Spices",
      desc: "Briefly heating whole spices in a dry pan before grinding releases essential oils and creates deeper flavor.",
      icon: <CookingPot size={48} />,
    },
    {
      id: 8,
      title: "Taste as You Go",
      desc: "The most important tool is your palate. Taste your food multiple times to check seasoning and texture.",
      icon: <Utensils size={48} />,
    },
    {
      id: 9,
      title: "Clean as You Go",
      desc: "Wash dishes and wipe surfaces during downtime. It makes the final cleanup effortless.",
      icon: <Sparkles size={48} />,
    },
  ];

  return (
    <div className="recipes-main-body">
      <div className="search-cluster">
        <h1 className="recipe-details-title">Chef's Pro Tips</h1>
        <p>Master these kitchen secrets to elevate your cooking game.</p>
      </div>

      <div className="recipe-container">
        {tips.map((tip) => (
          <div className="card-body" key={tip.id} style={{ height: "auto" }}>
            <div className="card-content" style={{ textAlign: "center", padding: "2.5rem" }}>
              <div 
                className="tip-icon" 
                style={{ 
                  display: "flex",
                  justifyContent: "center",
                  color: "var(--primary-teal)", 
                  marginBottom: "1.5rem",
                  opacity: "0.8" 
                }}
              >
                {tip.icon}
              </div>
              <h3 className="recipe-name" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                {tip.title}
              </h3>
              <p className="cuisine" style={{ lineHeight: "1.6", color: "var(--text-muted)" }}>
                {tip.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefTips;
