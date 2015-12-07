class BinsController < ApplicationController
  before_action :set_bin, only: [:show, :edit, :update, :destroy]
  before_action :set_options, only: [:new, :edit]

  def my_bins
  end

  def show
  end

  def new
    @bin = Bin.new
  end

  def create
    @bin = Bin.new(bin_params)
    if current_user
      @bin.user = current_user
    end
    @bin.save
    respond_to do |format|
      format.html do
        redirect_to edit_bin_path(@bin.slug)
      end
      format.js
    end
  end

  def edit
    @options[:url] = bin_path(identifier: @bin.slug)
    @options[:remote] = true
  end

  def update
    @bin.update(bin_params)
    respond_to do |format|
      format.html do
        redirect_to bin_path(@bin.slug)
      end
      format.js
    end
  end

  def destroy
    @bin.destroy
    redirect_to my_bins_path()
  end


  private

  def bin_params
    params.require(:bin).permit(:content)
  end

  def set_bin
    @bin = Bin.find_by_slug(params[:slug])
  end

  def set_options
    @options = {
      html: {
        id: :theBin
      }
    }
  end

end