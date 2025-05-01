import React from "react";

const About = () => {
  return (
    <>
      <div className="about-main-body">
        <section className="introduction">
          <h3>Welcome to CookBook Pro!</h3>
          At CookBook Pro, we believe that cooking should be fun, easy, and
          accessible to everyone. Whether you're a seasoned chef or a beginner
          in the kitchen, our app is here to help you discover delicious recipes
          tailored to your tastes and dietary preferences. From quick weekday
          meals to gourmet dishes, we’ve got you covered!
        </section>
        <section className="mission">
          <h3>Our Mission</h3>
          <p>
            Our mission is to inspire people to cook more at home by providing a
            seamless and enjoyable recipe discovery experience. We want to make
            it easy for you to find recipes that fit your lifestyle, whether
            you're looking for healthy options, quick meals, or something new
            and exciting to try.
          </p>
        </section>
        <section className="why">
          <h3>Why Choose CookBook Pro?</h3>
          <p>
            <span>Step-by-Step Instructions</span>: Follow easy-to-understand
            guides with photos and videos.
            <br />
            <span>Save Your Favorites</span>: Keep track of your go-to recipes
            for quick access.
            <br />
            <span>Explore Global Cuisines</span>: Discover dishes from around
            the world, from Italian pasta to Indian curries.
          </p>
        </section>
        <section className="team">
          <h3>Meet the Team</h3>
          <p>
            CookBook Pro was created by a passionate team of food lovers,
            developers, and designers who share a common goal: to make cooking
            easier and more enjoyable for everyone. We’re constantly working to
            improve the app and bring you the best possible experience.
          </p>
        </section>
        <section className="contact">
          <h3>We’d Love to Hear From You!</h3>
          <p>
            Have feedback, questions, or suggestions? We’re always here to help.
            Reach out to us at <span>support@cookbookpro.com</span> or connect
            with us on social media- <span>Facebook</span>
            <span>Instagram</span>
            <span>Twitter</span>
          </p>
        </section>
      </div>
    </>
  );
};

export default About;
