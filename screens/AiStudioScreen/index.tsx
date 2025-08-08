"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import cn from "classnames";
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Icon from "@/components/Icon";
import ScrollMask from "@/components/ScrollMask";
import NewFolder from "@/components/NewFolder";
import Folder from "@/components/Folder";
import NoResultSearch from "@/components/NoResultSearch";
import useEventsStore from "@/store/useEventsStore";
import InnerFolder from "./InnerFolder";
import NoFolders from "./NoFolders";
import styles from "./AiStudioScreen.module.sass";

import { aifolders } from "@/mocks/aifolders";

const AiStudioScreen = ({}) => {
  const [isNewFolder, setIsNewFolder] = useState(false);
  const [search, setSearch] = useState("");
  const mobile = useMediaQuery("(max-width: 767px)");
  const [activeFolderId, setActiveFolderId] = useState(mobile ? "" : "0");
  const [activeFolderIcons, setActiveFolderIcons] = useState("");
  const [visibleMobile, setVisibleMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isShowMobileNavigation, toggleMobileNavigation } = useEventsStore();

  // Get the selected folder details
  const selectedFolder = aifolders.find(folder => folder.id === activeFolderId);
  
  // Map folder names to API types
  const getFolderType = (folderName: string) => {
    const folderLower = folderName.toLowerCase();
    if (folderLower.includes("text to image")) return "text-to-image";
    if (folderLower.includes("image to text")) return "image-to-text";
    if (folderLower.includes("face swap")) return "face-swap";
    if (folderLower.includes("image to image")) return "image-to-image";
    if (folderLower.includes("background remove")) return "background-remove";
    return "general";
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // Handle folder selection
  const handleFolderSelect = (folderId: string) => {
    console.log(`Selecting folder: ${folderId}`);
    setActiveFolderId(folderId);
    setVisibleMobile(true);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Debug logging
  useEffect(() => {
    console.log(`Active folder changed to: ${activeFolderId}`);
    console.log('Selected folder data:', selectedFolder);
  }, [activeFolderId, selectedFolder]);

  if (!isMounted) return null;

  return (
    <>
      <Layout classSidebar={styles.sidebarLeft}>
        <div
          className={cn("row", styles.row, {
            [styles.visibleMobile]: visibleMobile,
          })}
        >
          <div className={cn("row-sidebar", styles.sidebar)}>
            <div className={styles.head}>
              {aifolders.length > 0 && (
                <Search
                  className={cn(styles.search, {
                    [styles.hide]: isNewFolder,
                  })}
                  classInput={styles.inputSearch}
                  placeholder="Search folder..."
                  value={search}
                  onChange={handleSearchChange}
                  onSubmit={handleSearchSubmit}
                />
              )}
              <button
                className={cn("button-circle", styles.add, {
                  [styles.active]: isNewFolder,
                })}
                onClick={() => {
                  setIsNewFolder(!isNewFolder);
                  toggleMobileNavigation();
                }}
              >
                <Icon name="plus" />
              </button>
            </div>
            {aifolders.length > 0 ? (
              search === "" ? (
                <ScrollMask
                  className={cn(styles.body, {
                    [styles.bodyNewFolder]: isNewFolder,
                  })}
                  isMobileNavigation={isShowMobileNavigation}
                  scrollEnd={isNewFolder}
                >
                  <div className={styles.aifolders}>
                    {aifolders.map((folder, index) => (
                      <Folder
                        onClick={() => handleFolderSelect(folder.id)}
                        active={activeFolderId === folder.id}
                        item={folder}
                        key={folder.id}
                        activeFolderIcons={activeFolderIcons}
                        setActiveFolderIcons={setActiveFolderIcons}
                        isNewFolder={isNewFolder}
                        iconSelectionDown={index < 3}
                      />
                    ))}
                  </div>
                  {isNewFolder && (
                    <NewFolder
                      className={styles.newFolder}
                      setActiveFolderIcons={setActiveFolderIcons}
                      setIsNewFolder={setIsNewFolder}
                    />
                  )}
                </ScrollMask>
              ) : (
                <NoResultSearch search={search} />
              )
            ) : (
              <NoFolders />
            )}
          </div>
          <InnerFolder
            key={`inner-folder-${activeFolderId}`} // Force re-mount on folder change
            className={styles.container}
            onClose={() => setVisibleMobile(false)}
            selectedFolderId={activeFolderId}
            selectedFolderName={selectedFolder?.name || ""}
            selectedFolderType={selectedFolder ? getFolderType(selectedFolder.name) : "general"}
          />
        </div>
      </Layout>
    </>
  );
};

export default AiStudioScreen;