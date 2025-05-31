const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className=" text-center py-2 mt-4 text-sm  w-full">
      &copy; {year}{" "}
      <a
        href="https://sithithasleema.github.io/sithi-portfolio-react/"
        target="_blank"
        className="text-primary hover:underline"
      >
        Sithi
      </a>{" "}
      . All rights reserved
    </div>
  );
};

export default Footer;
