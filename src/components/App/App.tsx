import "./App.css";
import { useEffect, useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import ImageGallery from "../imageGallery/ImageGallery";
import Loader from "../loader/Loader";
import { fetchImages } from "../../images-api";
import ImageModal from "../imageModal/ImageModal";
import LoadMoreBtn from "../loadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Image } from "./App.types";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  interface Results {
    results: Image[];
    total_pages: number;
  }

  useEffect(() => {
    if (!query) return;
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const { results, total_pages }: Results = await fetchImages(
          query,
          page
        );
        if (!results.length) {
          setIsEmpty(true);
          return;
        }
        setImages((prevImages) => [...prevImages, ...results]);
        setIsVisible(page < total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, query]);

  const onHandleSubmit = (value: string): void => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setError(false);
    setIsVisible(false);
  };

  const onLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (photo: Image | null): void => {
    if (photo !== null) {
      setSelectedImage(photo);
      setShowModal(true);
    }
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  return (
    <>
      <SearchBar onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {isVisible && (
        <LoadMoreBtn onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? "Loading" : "Load More"}
        </LoadMoreBtn>
      )}
      {error && <ErrorMessage>❌ Something went wrong</ErrorMessage>}
      {isEmpty && (
        <ErrorMessage>Sorry. There are no images ... 😭</ErrorMessage>
      )}
      <ImageModal
        image={selectedImage}
        modalIsOpen={showModal}
        closeModal={closeModal}
      />
    </>
  );
};

export default App;
